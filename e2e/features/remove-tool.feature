Feature: Remove tool

  Scenario Outline: Remove tool given there is <existing>
    Given that there is <existing> tool
     When i request to remove a tool
     Then i verify that <presented> tool is presented

  Examples:
  | existing      | presented |
  | one           | none      |
  | more than one | one       |

