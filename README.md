# IT3040 Assignment 1 - SwiftTranslator Automation Suite

This repository contains the test automation script for **Assignment 1** (Option 1: Sinhala) of the IT3040 - IT Project Management module.

The project utilizes **Playwright** to automate and validate the accuracy of [SwiftTranslator](https://www.swifttranslator.com/), a real-time Singlish-to-Sinhala transliteration tool.

##  Project Overview

The goal of this automation suite is to ensure the transliteration engine handles various linguistic patterns and UI interactions correctly. The script executes **35 specific test cases**:

* **Positive Functional Tests (Pos_Fun):** Validates correct conversion of simple sentences, complex grammar, questions, numbers, and mixed English terms.
* **Negative Functional Tests (Neg_Fun):** Tests the system's robustness against typographical errors, random spacing, and chaotic casing.
* **UI Tests (Pos_UI):** Verifies interface behaviors, specifically the input clearing functionality.

##  Tech Stack

* **Language:** JavaScript (Node.js)
* **Framework:** [Playwright](https://playwright.dev/)
* **Target URL:** `https://www.swifttranslator.com/`

##  Installation & Setup

Follow these steps to set up the testing environment locally:

1.  **Clone the Repository**
    ```
    git clone [https://github.com/it23725492/Playwright-project.git](https://github.com/it23725492/Playwright-project.git)
    cd Playwright-project
    ```

2.  **Install Dependencies**
    ```
    npm install
    ```

3.  **Install Playwright Browsers**
    This downloads the necessary browser binaries (Chromium, Firefox, WebKit).
    ```
    npx playwright install
    ```

##  Executing Tests

You can run the tests in different modes depending on your needs:

### 1. Run in Headless Mode (Default)
Runs tests in the background for faster execution.
```
npx playwright test
```
### 2. Run in Headed Mode (Visual)
Opens the browser window so you can watch the automation typing and validating.

```
npx playwright test --headed
```
### 3. View Test Report
After execution, generate and open a detailed HTML report of the results.

```
npx playwright show-report
```

### Project Structure
```tests/assignment.spec.js```: The main test file containing the ```testCases``` array and the execution logic.

```playwright.config.js```: Configuration settings for the test runner.
  
```package.json```: Project metadata and dependencies.

### Student Details:

Name: Tharusha A.D.D
  
ID: IT23725492
  
Course: BSc (Hons) in Information Technology
  
