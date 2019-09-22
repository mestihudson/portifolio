Feature: Add new tool

  Scenario Outline: Add new tool given that there is <existing> tool
    Given that there is <existing> tool
     When i request to add a new tool
     Then i verify that <presented> presented

  Examples:
  | existing      | presented               |
  | no one        | one tool is             |
  | one           | more than one tool is   |
  | more than one | exactly three tools are |

