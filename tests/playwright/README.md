# Playwright Tests - Influencer Type Modal

## Overview
This test suite comprehensively tests the influencer type selection modal and captures all console activity to identify errors and warnings.

## Test Coverage

### 1. Console Message Capture
- Captures ALL console messages (errors, warnings, logs, info, debug)
- Tracks page errors (uncaught exceptions)
- Monitors network request failures
- Provides detailed reporting with timestamps and locations

### 2. Modal Functionality Tests
- **Modal Appearance**: Verifies modal appears on first visit
- **Crypto Influencer Selection**: Tests crypto influencer option selection
- **General Influencer Selection**: Tests general influencer option selection
- **Modal Dismissal**: Confirms modal disappears after selection
- **Theme Changes**: Verifies theme updates based on selection
- **Persistence**: Checks localStorage for saved preferences
- **Return Visits**: Confirms modal doesn't reappear after selection

### 3. Error Analysis
- Categorizes errors by type (hydration, React, network)
- Provides detailed error locations and stack traces
- Generates comprehensive console reports
- Takes screenshots at key points for visual debugging

## Running the Tests

### Prerequisites
```bash
# Install dependencies (if not already done)
yarn install

# Install Playwright browsers
yarn playwright:install
```

### Run All Tests
```bash
# Run all tests in headless mode
yarn test:e2e

# Run with UI mode (interactive)
yarn test:e2e:ui

# Run in debug mode
yarn test:e2e:debug

# Run specific test file
yarn playwright test tests/playwright/influencer-modal.spec.ts

# Run in headed mode (see browser)
yarn playwright test --headed

# Run only in Chrome
yarn playwright test --project=chromium

# Generate HTML report
yarn playwright test --reporter=html
```

### View Test Results
After running tests, you can:
1. View the HTML report: `yarn playwright show-report`
2. Check screenshots in `tests/playwright/screenshots/`
3. Review console output in the terminal

## Test Output

### Console Message Summary
The tests provide a detailed summary including:
- Total message count
- Error count and details
- Warning count and details
- Categorized error analysis

### Screenshots
Screenshots are saved at:
- `modal-initial.png` - Modal on first load
- `after-crypto-selection.png` - After selecting crypto influencer
- `after-general-selection.png` - After selecting general influencer
- `second-visit-no-modal.png` - Confirms modal doesn't reappear
- `console-errors-check.png` - Captures any visible errors

## Interpreting Results

### Console Errors to Watch For
1. **Hydration Errors**: Server/client mismatch in React
2. **React Errors**: Component lifecycle or state issues
3. **Network Errors**: Failed API calls or resource loading
4. **TypeScript Errors**: Type mismatches in runtime

### Expected Behavior
- Modal should appear immediately on first visit
- Both selection buttons should be clickable
- Modal should disappear after selection
- Theme should change based on selection
- Preference should persist in localStorage
- Modal should NOT appear on subsequent visits

## Troubleshooting

### Common Issues

1. **Tests timeout waiting for modal**
   - Check if the app is running on localhost:3000
   - Verify the modal component is properly implemented
   - Check for JavaScript errors preventing modal render

2. **Console errors detected**
   - Review the detailed error output
   - Check error locations in the source code
   - Look for hydration mismatches or missing dependencies

3. **Theme not changing**
   - Verify theme provider is properly configured
   - Check if theme preference is being saved
   - Ensure CSS classes are correctly applied

## Development Tips

1. Run tests in UI mode for interactive debugging:
   ```bash
   yarn test:e2e:ui
   ```

2. Use the Playwright Inspector for step-by-step debugging:
   ```bash
   yarn test:e2e:debug
   ```

3. Generate code snippets using Playwright Codegen:
   ```bash
   yarn playwright codegen http://localhost:3000
   ```

4. Update selectors if the modal structure changes

## CI/CD Integration
These tests can be integrated into CI/CD pipelines. The configuration already includes:
- Retry logic for flaky tests
- Parallel execution settings
- Artifact collection (screenshots, videos, traces)
- HTML reporting

## Notes
- Tests clear localStorage between runs to ensure fresh state
- Screenshots are automatically taken on failures
- Videos are recorded for failed tests (retain-on-failure)
- Traces are captured on first retry for debugging