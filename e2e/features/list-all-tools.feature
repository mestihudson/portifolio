Feature: List all tools

  Scenario Outline: List all tools given that there is <existing> tool
    Given that there is <existing> tool
     When i request a list of all tools
     Then i verify that <presented> tool is presented

  Examples:
  | existing      | presented     |
  | no one        | none          |
  | one           | one           |
  | more than one | more than one |

