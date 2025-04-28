# Text Formatter

👉 [**View the live page here**](https://huichyigui.github.io/TextFormatter/)

This project provides a simple text formatting utility for processing user input based on selectable filter types.</br>
It is designed to take a block of text and format each valid entry into a clean, standardized list.

## Features
* Detects if the input is already properly formatted.
* Supports filtering input lines based on different criteria:
  * **P1**: Lines starting with `B` or `b`.
  * **J1**: Lines starting with `J` or `j`.
  * **F1**: Lines that are pure numbers.
  * **All Brands**: Lines that are either numbers, start with `B/b`, or start with `J/j`.
  * **All**: Includes all lines without any filtering.
* Automatically normalizes entries:
  * Ensures `B`/`J` are always in uppercase if they start the line.
* Customized Output Layout:
  * You can control how many items are displayed per line in the final output for better readability
* Wraps all filtered items in single quotes `'...'` for easier copying into queries, arrays, etc.

## How It Works
**1. User Input:**
A block of text is entered into a text input field.

**2. Button Actions:**
  * **Format**: Process and format the input according to the selected filter.
  * **Copy**: Copy the formatted result to clipboard with one click.
  * **Reset**: Clear all input and output fields to restart.

**3. Filtering:**
* Based on the selected filter option:
  * Only the matching lines are kept.
  * If "All (Unrestricted)" is selected, no lines are filtered out.

**4. Mapping and Normalization:**
* If a line starts with `B`/`b`, it will be normalized to start with `B`.
* If a line starts with `J`/`j`, it will be normalized to start with `J`.

**5. Output:**
* Each item is wrapped in single quotes.
* The final list is ready for further usage (e.g., SQL queries, JSON arrays).
 
