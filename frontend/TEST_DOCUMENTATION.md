# Tài Liệu Testing cho Learn English Vocabulary

## Tổng Quan

Dự án này sử dụng nhiều loại test để đảm bảo chất lượng và độ tin cậy của ứng dụng.

## Cấu Trúc Test

```
frontend/src/__tests__/
├── components/          # Unit tests cho components
│   ├── QuizQuestion.test.tsx
│   ├── TopicCard.test.tsx
│   └── VocabularyCard.test.tsx
├── pages/              # Tests cho pages
│   └── HomePage.test.tsx
├── hooks/              # Tests cho custom hooks
│   └── useQuiz.test.ts
├── utils/              # Tests cho utility functions
│   └── api.test.ts
├── integration/        # Integration tests
│   └── QuizFlow.test.tsx
└── e2e/               # End-to-end tests
    └── quiz.cy.ts
```

## Loại Tests

### 1. Unit Tests
- **Mục đích**: Test các thành phần riêng lẻ
- **Công cụ**: Jest + React Testing Library
- **Vị trí**: `__tests__/components/`, `__tests__/hooks/`, `__tests__/utils/`

**Ví dụ test cases:**
- Render component đúng cách
- Xử lý events
- Hiển thị dữ liệu
- Validation logic

### 2. Integration Tests
- **Mục đích**: Test tương tác giữa các components
- **Công cụ**: Jest + React Testing Library
- **Vị trí**: `__tests__/integration/`

**Ví dụ test cases:**
- Luồng hoàn thành quiz
- Lưu và khôi phục progress
- Tương tác API

### 3. End-to-End Tests
- **Mục đích**: Test toàn bộ user journey
- **Công cụ**: Cypress
- **Vị trí**: `cypress/e2e/`

**Ví dụ test cases:**
- Đăng ký/đăng nhập
- Học từ vựng hoàn chỉnh
- Làm quiz và xem kết quả

## Các Lệnh Chạy Test

```bash
# Chạy tất cả unit tests và integration tests
npm test

# Chạy tests với watch mode
npm run test:watch

# Chạy tests với coverage report
npm run test:coverage

# Chạy E2E tests
npm run test:e2e

# Mở Cypress GUI
npm run test:e2e:dev
```

## Test Coverage Goals

- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%
- **Statements**: 80%

## Best Practices

### 1. Naming Convention
- File test: `ComponentName.test.tsx`
- Test cases: Mô tả rõ ràng hành vi được test

### 2. Test Structure
```typescript
describe('Component/Feature Name', () => {
  beforeEach(() => {
    // Setup code
  });

  test('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### 3. Mock Data
- Tạo mock data phù hợp với interface thực tế
- Sử dụng factory functions cho mock data

### 4. Async Testing
```typescript
test('handles async operations', async () => {
  // Use waitFor for async assertions
  await waitFor(() => {
    expect(screen.getByText('Expected text')).toBeInTheDocument();
  });
});
```

## Debugging Tests

### 1. Debug với screen.debug()
```typescript
test('debug example', () => {
  render(<Component />);
  screen.debug(); // In ra DOM hiện tại
});
```

### 2. Sử dụng --verbose flag
```bash
npm test -- --verbose
```

### 3. Run specific test
```bash
npm test -- QuizQuestion.test.tsx
```

## Checklist cho Tester

### Trước khi commit:
- [ ] Tất cả tests pass
- [ ] Coverage đạt yêu cầu
- [ ] Không có console errors
- [ ] E2E tests pass

### Khi thêm feature mới:
- [ ] Viết unit tests cho components mới
- [ ] Viết integration tests cho user flows
- [ ] Update E2E tests nếu cần
- [ ] Update test documentation

### Bug fixes:
- [ ] Viết test reproduce bug
- [ ] Fix bug
- [ ] Verify test pass
- [ ] Ensure không break existing tests

## Common Test Patterns

### 1. Testing User Interactions
```typescript
fireEvent.click(screen.getByRole('button'));
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
```

### 2. Testing Form Submissions
```typescript
fireEvent.change(input, { target: { value: 'test' } });
fireEvent.submit(form);
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

### 3. Testing API Calls
```typescript
jest.spyOn(global, 'fetch').mockResolvedValue({
  json: () => Promise.resolve(mockData)
});
```

## Troubleshooting

### Lỗi thường gặp:

1. **Cannot find module**: Kiểm tra import paths
2. **Element not found**: Sử dụng waitFor cho async operations
3. **Mock not working**: Đảm bảo mock được setup đúng cách

### Performance Tips:

1. Sử dụng `screen.getByRole()` thay vì `getByTestId()` khi có thể
2. Avoid deep rendering trong unit tests
3. Sử dụng `cleanup()` sau mỗi test nếu cần

## Tài Liệu Tham Khảo

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io/) 