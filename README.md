1. Setup/installation instructions
    1. macOs
    2. node version: v6.7.0
    3. npm install
    4. npm start

2. A quick (1 page) description of your solution

    1. In this test, I try to build reusable components
    2. For the WeatherCard, I use the functional component to build it because it only display props
    3. I use less to write the css and use flex-box to handle the structure of the ui

3. A list of assumptions that you’ve made while putting this together.

    1. I only make assume user could type the name too long so I use css ellipsis to handle it.

4. testing

    1. test the default component structure of the ui, for example how many Input components inside the Weather componet
    2. test the component structure changes when given different props or state.
    3. test the props method and see after some procedure the method can receive correct args, for example, test the
     onChange method in the Input component, when the input's value is change, is the onChange method being trigger and
     get the input's value
