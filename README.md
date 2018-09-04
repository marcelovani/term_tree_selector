# Term Tree Selector

Provides root/leaf selector blocks for term trees with 2 or 3 levels

## Installation

Once enabled, you can place one or more "Term Tree Selector" blocks
with the following configuration:

**Vocabulary:** The hierarchical vocabulary to use

**Root Label:** The label of the root terms, e.g. "Make", used to
display "Select Make" in the select box.

**Leaf Label:** The label of the leaf terms, e.g. "Model", used to
display "Select Model" in the select box.

**Leaf Level:** The number levels to traverse to populate the leaf
select box (Second or Third)

**Submit Label:** The text shown on the submit button

**Description (optional):** Text that will be display above the form

## REST Endpoints
The following REST Export endpoints are provided by the
"Term Tree Selector" view.

### Root terms [/term-tree-selector/{vocabulary}/level/{level}]

Returns the root level terms for provided vocabulary and level.

+ Parameters
    + vocabulary (string) - Vocabulary machine name
    + level (enum[number])

         Number of levels in the term tree

        + Members
            + `2`
            + `3`

#### Retrieve Root Terms [GET]

+ Response 200 (application/json)

    + Body

            {
              "name": "Ford"
              "tid": 123,
              "url": "/ford"
            }

### Leaf terms [/term-tree-selector/{vocabulary}/{tid}/level/{level}]

Returns the root level terms for provided vocabulary and level.

+ Parameters
    + vocabulary (string) - Vocabulary machine name
    + tid (number) - Term ID of the root term
    + level (enum[number])

         Number of levels in the term tree

        + Members
            + `2`
            + `3`

#### Retrieve Leaf Terms [GET]

+ Response 200 (application/json)

    + Body

            {
              "name": "Ford Focus"
              "tid": 456,
              "url": "/ford/focus"
            }
