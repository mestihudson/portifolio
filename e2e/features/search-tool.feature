Feature: Search tool

  Scenario Outline: Search tool by <category>
    Given that there is more than one tool
     When i search by <category>
     Then i verify that one tool is presented

  Examples:
  | category        |
  | global criteria |
  | specific tag    |
