#!/bin/bash

echo "Running Trivy Security Scan..."

trivy image prudhviraj/grocery-backend:latest

trivy image prudhviraj/grocery-frontend:latest

echo "Scan Completed"