import { LessonObjectType, PromptLessonLearnObjectType } from "@/types";

export const studentDataOne: PromptLessonLearnObjectType = {
  name: "Dauda Kolo",
  gradeLevel: 11,
  schoolLevel: "high school",
  gender: "male",
  age: 18,
  subjectToLearn: "Algebra",
  curriculum: [
    {
      sectionNumber: 1,
      isSectionCompleted: false,
      sectionTitle: "Introduction to Algebra",
      lessons: [
        { id: 1, title: "What is Algebra?", isLessonCompleted: false },
        {
          id: 2,
          title: "Variables and their importance",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title:
            "Representing real-world situations with algebraic expressions",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 2,
      isSectionCompleted: false,
      sectionTitle: "Simplifying Expressions",
      lessons: [
        { id: 1, title: "Combining like terms", isLessonCompleted: false },
        {
          id: 2,
          title: "Simplifying expressions with variables and constants",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Order of operations (PEMDAS or BODMAS)",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 3,
      isSectionCompleted: false,
      sectionTitle: "Solving Linear Equations",
      lessons: [
        {
          id: 1,
          title: "Understanding equations with variables",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title:
            "Solving equations for one variable (addition, subtraction, multiplication, division)",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Applications of solving equations in real-world problems",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 4,
      isSectionCompleted: false,
      sectionTitle: "More on Expressions",
      lessons: [
        {
          id: 1,
          title: "Evaluating expressions with given values",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Classifying expressions (monomials, binomials, trinomials)",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Combining like terms with different variables",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 5,
      isSectionCompleted: false,
      sectionTitle: "Factoring Expressions",
      lessons: [
        {
          id: 1,
          title:
            "Understanding factorization (breaking expressions into products)",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Factoring by grouping",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Factoring perfect squares and the difference of squares",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 6,
      isSectionCompleted: false,
      sectionTitle: "Linear Inequalities",
      lessons: [
        {
          id: 1,
          title: "Representing inequalities with symbols (<, >, ≤, ≥)",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Solving linear inequalities in one variable",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Graphing linear inequalities on a number line",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 7,
      isSectionCompleted: false,
      sectionTitle: "Introduction to Functions",
      lessons: [
        {
          id: 1,
          title: "What is a function?",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Representing functions with equations, tables, and graphs",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Understanding the concept of slope and y-intercept",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 8,
      isSectionCompleted: false,
      sectionTitle: "Graphs of Linear Functions",
      lessons: [
        {
          id: 1,
          title: "Slope-intercept form of linear equations (y = mx + b)",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Finding the slope and y-intercept from an equation",
          isLessonCompleted: false,
        },
        {
          id: 3,
          title: "Graphing linear functions using slope and y-intercept",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 9,
      isSectionCompleted: false,
      sectionTitle: "Systems of Linear Equations",
      lessons: [
        {
          id: 1,
          title:
            "Solving systems of equations with two variables (substitution and elimination methods)",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title:
            "Applications of solving systems of equations in real-world problems",
          isLessonCompleted: false,
        },
      ],
    },
    {
      sectionNumber: 10,
      isSectionCompleted: false,
      sectionTitle: "Systems of Linear Equations",
      lessons: [
        {
          id: 1,
          title: "Review of key concepts learned in the course",
          isLessonCompleted: false,
        },
        {
          id: 2,
          title: "Practice problems covering various algebra topics",
          isLessonCompleted: false,
        },
      ],
    },
  ],
};

// RESPONSE FORMAT
const exampleResponse: LessonObjectType = {
  subject: "Addition",
  lessonTitle: "Adding two numbers or objects",
  lessonSlug: "adding-two-numbers-or-objects",
  lessonId: 2,
  lessonDetails: [
    {
      id: 1,
      title: "Here you will learn about the intro to calculus",
      details: "", //htmlParse type, // The lesson should be in rich text html format,
      type: "lesson", // "lesson" | "quiz"
      isComplete: false, //boolean
    },
    {
      id: 2,
      title: "Here is a short quiz for you",
      details: "", //htmlParse type, // The lesson should be in rich text html format,,
      question: "What is 10 + 10",
      answerType: "options",
      type: "quiz", // "lesson" | "quiz"
      options: [
        { id: "1", value: "10" },
        { id: "2", value: "5" },
        { id: "3", value: "20" },
        { id: "4", value: "1" },
      ],
      answer: "20", // string
      timeout: 5000, // number
      isComplete: false, //boolean
    },
    {
      id: 3, // number
      title: "2 you will learn about the intro to calculus",
      details: "", //htmlParse type, // The lesson should be in rich text html format,
      type: "lesson", // "lesson" | "quiz"
      isComplete: false, //boolean
    },
  ],
};


const exampleInput1 = {
  instruction:
    'Teach the lesson "Applications of solving systems of equations in real-world problems" from the section "Systems of Linear Equations" of the curriculum below:',
  ...studentDataOne,
};

const exampleOutput1 = {
  subject: "Algebra",
  lessonTitle:
    "Applications of solving systems of equations in real-world problems",
  lessonId: 2,
  lessonDetails: [
    {
      id: 1,
      title: "Introduction",
      details:
        "<h1>In this lesson </h1> <p>we will explore how systems of equations can be used to solve real-world problems.</p>  <p>>We will start by reviewing the basics of solving systems of equations, and then we will look at some examples of how systems of equations can be used to model and solve problems in various fields such as physics, economics, and engineering.</p>",
      type: "lesson",
      isComplete: false,
    },
    {
      id: 2,
      title: "Example 1: Mixing Chemicals",
      details:
        "<strong>A chemist has two solutions of acid, one that is 20% acid and the other that is 50% acid.</strong> ",
      question:
        "<p>How many milliliters of each solution should the chemist mix to obtain 100 milliliters of a 30% acid solution?</p> ",
      answerType: "options",
      type: "quiz",
      options: [
        { id: "1", value: "20 ml of 20% solution and 80 ml of 50% solution" },
        { id: "2", value: "30 ml of 20% solution and 70 ml of 50% solution" },
        {
          id: "3",
          value: "66.67 ml of 20% solution and 33.33 ml of 50% solution",
        },
        { id: "4", value: "40 ml of 20% solution and 60 ml of 50% solution" },
      ],
      answer: "66.67 ml of 20% solution and 33.33 ml of 50% solution",
      timeout: 5000,
      isComplete: false,
    },
    {
      id: 3,
      title: "Example 2: Motion of Two Objects",
      details: "",
      question:
        "Two cars start from the same point and travel in the same direction. The first car travels at a speed of 60 km/h, and the second car travels at a speed of 80 km/h. How long will it take for the second car to overtake the first car?",
      answerType: "options",
      type: "quiz",
      options: [
        {
          id: "1",
          value: "Never, the second car will never overtake the first car",
        },
        { id: "2", value: "1 hour" },
        {
          id: "3",
          value: " 2 hours",
        },
        { id: "4", value: "3 hours" },
      ],
      answer: "3 hours",
      timeout: 5000,
      isComplete: false,
    },
    {
      id: 4,
      title: "Example 3: Supply and Demand",
      details: "",
      question:
        "The supply and demand for a certain product are given by the equations Qs = 2p - 10 and Qd = 100 - 3p, where Qs is the quantity supplied, Qd is the quantity demanded, and p is the price. Find the equilibrium price and quantity.",

      answerType: "options",
      type: "quiz",
      options: [
        {
          id: "1",
          value: "Equilibrium price: $22, Equilibrium quantity: 34 units",
        },
        {
          id: "2",
          value: "Equilibrium price: $15, Equilibrium quantity: 40 units",
        },
        {
          id: "3",
          value: "Equilibrium price: $10, Equilibrium quantity: 20 units",
        },
        {
          id: "4",
          value: "Equilibrium price: $25, Equilibrium quantity: 50 units",
        },
      ],
      answer: "Equilibrium price: $22, Equilibrium quantity: 34 units",
      timeout: 5000,
      isComplete: false,
    },
  ],
};