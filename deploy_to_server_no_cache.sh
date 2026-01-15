#!/bin/bash

# Deployment script for garbage-can app with NO CACHE
# This script forces a clean build to ensure updates are deployed

set -e  # Exit on error

SERVER="mim"
REMOTE_PATH="/opt/garbage-can"
PORT="9999"
CONTAINER_NAME="garbage-can"

echo "🚀 Starting deployment to $SERVER (NO CACHE)..."

# Step 1: Create remote directory if it doesn't exist
echo "📁 Creating remote directory..."
ssh $SERVER "sudo mkdir -p $REMOTE_PATH && sudo chown -R \$USER:\$USER $REMOTE_PATH"

# Step 2: Copy application files to server
echo "📦 Copying application files to server..."
rsync -avz --exclude 'node_modules' \
           --exclude 'dist' \
           --exclude '.git' \
           --exclude '.DS_Store' \
           --exclude '*.log' \
           ./ $SERVER:$REMOTE_PATH/

# Step 3: Build and run Docker container on server
echo "🐳 Building and deploying Docker container (NO CACHE)..."
ssh $SERVER << EOF
    cd $REMOTE_PATH
    
    # Stop and remove existing container if it exists
    if [ \$(docker ps -a -q -f name=$CONTAINER_NAME) ]; then
        echo "🛑 Stopping existing container..."
        docker stop $CONTAINER_NAME || true
        docker rm $CONTAINER_NAME || true
    fi
    
    # Remove old image to force complete rebuild
    if [ \$(docker images -q $CONTAINER_NAME:latest) ]; then
        echo "🗑️  Removing old Docker image..."
        docker rmi $CONTAINER_NAME:latest || true
    fi
    
    # Build the Docker image with no cache
    echo "🔨 Building Docker image (NO CACHE)..."
    docker build --no-cache -t $CONTAINER_NAME:latest .
    
    # Run the container
    echo "▶️  Starting container on port $PORT..."
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p $PORT:80 \
        $CONTAINER_NAME:latest
    
    # Show container status
    echo "✅ Container status:"
    docker ps -f name=$CONTAINER_NAME
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "📡 Application is available at: http://\$(hostname -I | awk '{print \$1}'):$PORT"
EOF

echo ""
echo "✨ Deployment finished successfully!"
echo "⚠️  Remember to hard refresh your browser (Cmd+Shift+R) to see changes!"

