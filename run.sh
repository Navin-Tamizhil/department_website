#!/bin/bash

# This script automates the process of setting up and running the department website locally.
# It ensures all dependencies are installed before starting the development server.

# Navigate to the script's directory to ensure commands are run in the project root
cd "$(dirname "$0")"

echo "Step 1: Installing project dependencies with npm..."
npm install

echo "Step 2: Starting the Vite development server..."
npm run dev