export const demoJourneyInput = {
  goal: "Learn Python Programming",
  why: "Build practical programming skills from beginner level.",
  dailyTime: "30 min",
  targetDate: "",
};

export const demoGeneratedJourney = {
  title: "Learn Python Programming",
  description:
    "A practical beginner-friendly Python roadmap covering fundamentals, control flow, data structures, functions, files, errors, and a small final project.",
  categoryLabel: "Programming",
  phases: [
    {
      title: "Python Foundations",
      summary: "Learn Python syntax, variables, expressions, and basic input/output.",
      tasks: [
        {
          title: "Variables and Data Types",
          estimatedMinutes: 30,
          difficulty: "Easy",
          impact: "High impact",
          lesson: {
            overview:
              "Learn how Python stores information using variables and common data types such as integers, floats, strings, and booleans.",
            learn: [
              "Create and assign variables",
              "Identify basic Python data types",
              "Convert values between compatible types",
            ],
            exercise:
              "Create variables for your name, age, height, and whether you are a student, then print them.",
            steps: [
              "Create a new Python file.",
              "Declare four variables using different data types.",
              "Print each value and its type using type().",
              "Convert one numeric value to a string.",
            ],
            successCriteria: [
              "You can create variables without syntax errors.",
              "You can identify int, float, str, and bool values.",
            ],
            resourceQueries: [
              {
                title: "Python Variables",
                query: "Python official tutorial variables data types",
                type: "web",
              },
            ],
          },

        },
        {
          title: "Operators and Expressions",
          estimatedMinutes: 30,
          difficulty: "Easy",
          impact: "High impact",
          lesson: {
            overview:
              "Use arithmetic, comparison, and logical operators to perform calculations and create useful expressions.",
            learn: [
              "Use arithmetic operators",
              "Compare values",
              "Combine boolean conditions",
            ],
            exercise:
              "Build a small calculator that calculates total price after a discount.",
            steps: [
              "Create variables for price and discount.",
              "Calculate the discount amount.",
              "Calculate the final price.",
              "Print the result.",
            ],
            successCriteria: [
              "Arithmetic expressions produce correct results.",
              "You understand comparison and logical operators.",
            ],
            resourceQueries: [
              {
                title: "Python Operators",
                query: "Python operators beginner tutorial",
                type: "web",
              },
            ],
          },
        },
        {
          title: "Input and Output",
          estimatedMinutes: 30,
          difficulty: "Easy",
          impact: "Medium impact",
          lesson: {
            overview:
              "Learn how Python programs receive information from users and display useful output.",
            learn: [
              "Use input()",
              "Use print()",
              "Convert user input to numeric values",
            ],
            exercise:
              "Create a program that asks for a user's name and age and prints a personalized message.",
            steps: [
              "Ask for the user's name.",
              "Ask for the user's age.",
              "Convert the age when necessary.",
              "Print a formatted message.",
            ],
            successCriteria: [
              "The program accepts keyboard input.",
              "The program displays a personalized result.",
            ],
            resourceQueries: [
              {
                title: "Python Input Output",
                query: "Python input print beginner tutorial",
                type: "web",
              },
            ],
          },
        },
      ],
    },

    {
      title: "Control Flow",
      summary: "Control what your program does using decisions and repetition.",
      tasks: [
        {
          title: "Conditional Statements",
          estimatedMinutes: 30,
          difficulty: "Easy",
          impact: "High impact",
          lesson: {
            overview:
              "Use if, elif, and else statements to make programs choose different actions.",
            learn: [
              "Write if statements",
              "Use elif and else",
              "Combine conditions",
            ],
            exercise:
              "Create a program that classifies a student's marks into grade categories.",
            steps: [
              "Ask the user for marks.",
              "Convert the input to a number.",
              "Create if/elif/else conditions.",
              "Print the resulting grade.",
            ],
            successCriteria: [
              "Different marks produce appropriate grades.",
              "Conditions execute in the correct order.",
            ],
            resourceQueries: [
              {
                title: "Python If Statements",
                query: "Python if elif else beginner",
                type: "web",
              },
            ],
          },
        },
        {
          title: "For Loops",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "High impact",
          lesson: {
            overview:
              "Use for loops to repeat operations across sequences and ranges.",
            learn: [
              "Iterate through ranges",
              "Iterate through collections",
              "Use loop variables",
            ],
            exercise: "Print the multiplication table of a number selected by the user.",
            steps: [
              "Ask for a number.",
              "Create a range from 1 to 10.",
              "Loop through the range.",
              "Print each multiplication result.",
            ],
            successCriteria: [
              "The loop runs the correct number of times.",
              "The multiplication results are correct.",
            ],
            resourceQueries: [
              {
                title: "Python For Loops",
                query: "Python for loop range tutorial",
                type: "web",
              },
            ],
          },
        },
        {
          title: "While Loops",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "Medium impact",
          lesson: {
            overview:
              "Use while loops when repetition should continue until a condition changes.",
            learn: [
              "Create while loops",
              "Update loop conditions",
              "Avoid infinite loops",
            ],
            exercise:
              "Create a number guessing loop that continues until the correct answer is entered.",
            steps: [
              "Choose a target number.",
              "Ask the user for a guess.",
              "Repeat while the guess is incorrect.",
              "Stop when the correct number is entered.",
            ],
            successCriteria: [
              "The loop terminates correctly.",
              "The program responds to incorrect guesses.",
            ],
            resourceQueries: [
              {
                title: "Python While Loops",
                query: "Python while loop beginner examples",
                type: "web",
              },
            ],
          },
        },
      ],
    },

    {
      title: "Functions and Data Structures",
      summary:
        "Organize code using functions and work with Python's main collection types.",
      tasks: [
        {
          title: "Functions and Parameters",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "High impact",
          lesson: {
            overview:
              "Functions allow reusable pieces of logic to be organized into clear units.",
            learn: [
              "Define functions",
              "Pass parameters",
              "Return values",
            ],
            exercise:
              "Write a function that accepts two numbers and returns their average.",
            steps: [
              "Define the function.",
              "Add two parameters.",
              "Calculate the average.",
              "Return and print the result.",
            ],
            successCriteria: [
              "The function works with different inputs.",
              "The function returns the expected value.",
            ],
            resourceQueries: [
              {
                title: "Python Functions",
                query: "Python functions parameters return tutorial",
                type: "web",
              },
            ],
          },
        },
        {
          title: "Lists and Tuples",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "High impact",
          lesson: {
            overview:
              "Lists and tuples store multiple values and are fundamental to Python programming.",
            learn: [
              "Create lists",
              "Access and modify elements",
              "Understand tuples",
            ],
            exercise:
              "Create a list of five marks and calculate the highest mark and average.",
            steps: [
              "Create the marks list.",
              "Use sum() and len().",
              "Find the maximum value.",
              "Print the results.",
            ],
            successCriteria: [
              "You can access list elements.",
              "You can perform calculations using list data.",
            ],
            resourceQueries: [
              {
                title: "Python Lists",
                query: "Python lists tuples beginner tutorial",
                type: "web",
              },
            ],
          },
        },
        {
          title: "Dictionaries and Sets",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "Medium impact",
          lesson: {
            overview:
              "Dictionaries store key-value relationships while sets store unique values.",
            learn: [
              "Create dictionaries",
              "Access key-value pairs",
              "Use sets for unique values",
            ],
            exercise:
              "Create a dictionary containing student information and display each field.",
            steps: [
              "Create the dictionary.",
              "Add name, course, and marks.",
              "Access values by key.",
              "Print each item.",
            ],
            successCriteria: [
              "Dictionary values can be accessed correctly.",
              "You understand when sets are useful.",
            ],
            resourceQueries: [
              {
                title: "Python Dictionaries",
                query: "Python dictionaries sets beginner",
                type: "web",
              },
            ],
          },
        },
      ],
    },

    {
      title: "Practical Python",
      summary:
        "Apply Python fundamentals to files, errors, and a small complete program.",
      tasks: [
        {
          title: "Reading and Writing Files",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "High impact",
          lesson: {
            overview:
              "Learn how programs permanently store and retrieve information using files.",
            learn: [
              "Open files safely",
              "Write text to files",
              "Read stored content",
            ],
            exercise:
              "Create a program that saves a short note to a text file and reads it back.",
            steps: [
              "Open a text file using with.",
              "Write content to it.",
              "Reopen the file for reading.",
              "Print the stored content.",
            ],
            successCriteria: [
              "The file is created successfully.",
              "The saved content can be read back.",
            ],
            resourceQueries: [
              {
                title: "Python File Handling",
                query: "Python file handling with open beginner",
                type: "web",
              },
            ],
          },
        },
        {
          title: "Exception Handling",
          estimatedMinutes: 30,
          difficulty: "Medium",
          impact: "High impact",
          lesson: {
            overview:
              "Exception handling prevents common runtime errors from crashing your program.",
            learn: [
              "Use try and except",
              "Handle invalid input",
              "Create safer programs",
            ],
            exercise:
              "Build a division program that safely handles invalid numbers and division by zero.",
            steps: [
              "Ask for two numbers.",
              "Place conversion and division inside try.",
              "Handle ValueError.",
              "Handle ZeroDivisionError.",
            ],
            successCriteria: [
              "Invalid input does not crash the program.",
              "Division by zero is handled gracefully.",
            ],
            resourceQueries: [
              {
                title: "Python Exceptions",
                query: "Python try except beginner tutorial",
                type: "web",
              },
            ],
          },
        },
        {
          title: "Build a Command-Line Task Manager",
          estimatedMinutes: 60,
          difficulty: "Hard",
          impact: "High impact",
          lesson: {
            overview:
              "Combine your Python knowledge into a small command-line task manager.",
            learn: [
              "Combine functions and collections",
              "Design a simple menu system",
              "Apply control flow in a complete program",
            ],
            exercise:
              "Build a program that allows users to add, list, and remove tasks.",
            steps: [
              "Create a list to store tasks.",
              "Create functions for adding and displaying tasks.",
              "Create a function to remove a task.",
              "Use a loop to display the application menu.",
            ],
            successCriteria: [
              "Users can add tasks.",
              "Users can view tasks.",
              "Users can remove tasks.",
            ],
            resourceQueries: [
              {
                title: "Python Beginner Project",
                query: "Python command line task manager beginner project",
                type: "video",
              },
            ],
          },
        },
      ],
    },
  ],
};