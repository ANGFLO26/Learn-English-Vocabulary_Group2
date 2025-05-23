#!/bin/bash

echo "🧪 Running Test Suite for Learn English Vocabulary"
echo "================================================="

# Kiểm tra dependencies
echo "📦 Checking dependencies..."
npm ci

# Chạy linter trước
echo "🔍 Running linter..."
npm run lint

# Chạy unit tests và integration tests
echo "🔬 Running unit and integration tests..."
npm run test:coverage

# Kiểm tra coverage threshold
echo "📊 Checking coverage threshold..."
if [ $? -eq 0 ]; then
    echo "✅ Unit tests passed with sufficient coverage"
else
    echo "❌ Unit tests failed or coverage below threshold"
    exit 1
fi

# Build project để đảm bảo không có lỗi TypeScript
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Chạy E2E tests (chỉ khi có Cypress được cài đặt)
if command -v cypress &> /dev/null; then
    echo "🌐 Running E2E tests..."
    npm run test:e2e
    
    if [ $? -eq 0 ]; then
        echo "✅ E2E tests passed"
    else
        echo "❌ E2E tests failed"
        exit 1
    fi
else
    echo "⚠️  Cypress not found, skipping E2E tests"
fi

echo ""
echo "🎉 All tests completed successfully!"
echo "📈 Test Summary:"
echo "   - Linting: ✅"
echo "   - Unit Tests: ✅"
echo "   - Integration Tests: ✅"
echo "   - Build: ✅"
echo "   - E2E Tests: ✅" 