# Bar Chart using HTML, CSS and JavaScript (jQuery)

This library provides an easy way to create Single and Stackable Bar Charts.

## Getting Started

You can clone, fork or download the whole project to use the Bar Chart examples. Or you can simply download the library **bar-chart.js**

### Prerequisites

If you only want to use the library you have to add jQuery CDN or file, as well as jQuery KeyFrames.
Don't forget to add the bar-chart.js library.

```
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
  <script src="./scripts/jquery.keyframes.min.js"></script>
  <script src="./scripts/bar-chart.js"></script>
```

### Examples

You can create Single Bar Charts:
![Image of Single Bar Chart](https://raw.githubusercontent.com/jomicm/barChart/master/images/single-bar.png)

And you can also create Stackable Bar Charts:
![Image of Single Bar Chart](https://raw.githubusercontent.com/jomicm/barChart/master/images/stackable-bar.png)

### API function

Once imported the required libraries, you only have to call a function for each bar you want to create.

The function should be called once the document is loaded through jQuery.

*Example of function signature:*
```
  $(function () {
    drawBarChart(data, options, element);
  });
```

#### Parameter description

- data
  - Object that contains the information to be drawn in the Chart. Each value must contain an array of at least one element.
- options
  - Object that contains general configurations for the Chart e.g. Title Color, Title Font Size, etc.
- element
  - Represents the HTML element where the Chart will be appended to.

### Features list and examples

data - Parameter for Single Chart. 
*(Each element has an array of 1 sub element)*
```
data = {
  'Go': [{ val: 15.0, color: 'red' }],
  'Javascript': [{ val: 17.8, color: 'brown' }],
  'Kotlin': [{ val: 11.1, color: 'purple' }],
  'Python': [{ val: 25.7, color: 'blue' }],
  'TypeScript': [{ val: 14.6, color: 'green ' }],
};
```
data - Parameter for Stackable Chart. 
*(Each element has an array of 2 or more sub elements)*
```
data = {
  'Q1': [{val: 42, color: 'red'},{val: 48, color: 'purple'},{val: 46, color: 'blue'},{val: 32, color: 'orange'}],
  'Q2': [{val: 53, color: 'red'},{val: 62, color: 'purple'},{val: 60, color: 'blue'},{val: 45, color: 'orange'}],
  'Q3': [{val: 47, color: 'red'},{val: 55, color: 'purple'},{val: 58, color: 'blue'},{val: 54, color: 'orange'}],
  'Q4': [{val: 60, color: 'red'},{val: 74, color: 'purple'},{val: 70, color: 'blue'},{val: 46, color: 'orange'}],
};
```

options - Parameter for Single Chart.
```
options = {
  title: 'Commitment Development Index 2018', // The title of the Chart
  titleColor: 'midnightblue', // The color of the Chart title
  titleFontSize: '35pt', // The font size of the Chart title
  width: '650px', // The width of the chart
  height: '70px', // The height of the chart
  barSpacing: '30', // The spacing between bars
  labelColor: 'white', // The color of values' labels
  labelPosition: 'centre', // The position of values' labels
};
```
options - Parameter for Stackable Chart. 
*(Additionally to the Single Chart example, you can add an element to "options" named "indicators" that contains an array of the labels to be used to give extra information about stackable bar colors and meaning)*
```
indicators: [{ name: 'East', color: 'white', background: 'red' }, { name: 'West', color: 'white', background: 'purple' }, { name: 'North', color: 'white', background: 'blue' }, { name: 'South', color: 'white', background: 'orange' }]
```

### Known issues and bugs

* When selected certain values for "width" and "height" the behavior is not as expected.

### Features to be implemented

This project is a work in progress. So, below you can find next features to be added.
* Possibility to modify background colors.
* Select between the actual values or percentage for y Axis.
* Add informative labels for X and Y axis.
* Add option to switch between vertical and horizontal Bar Chart.
* Integrate more animations.
* Add more filling options like solid and different patterns.

### Authors

* **Miguel Cruz** - *Initial work* -

### Acknowledgments

* Traversy Media - [CSS Grid Layout Crash Course](https://www.youtube.com/watch?v=jV8B24rSN5o)
* DarkCode - [Awesome Animated skills bar using only HTML & CSS](https://youtu.be/3l4TQyYgOg4)
* DevTips - [CSS Transition (CSS Animations Series Part 1)](https://youtu.be/8kK-cA99SA0)
