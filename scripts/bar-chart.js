/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

// class BarChart {
function drawBarChart(data, options, element) {
  // Create a unique ID to complement classes
  const uID = element.replace('#', '');
  // Create main html layout
  setMainLayout(uID, element, options.title);
  // Set total amount of bars
  const barAmount = Object.keys(data).length;
  // Get max value received
  const maxValue = getMaxValue(data);
  // Assign values to Y axis based upon total amount of bars
  const yValues = getYValues(barAmount, maxValue);
  // Set grid of bars and labels
  setGrid(uID, barAmount);
  // Create the chart including: yValues, xValues and bars
  createChart(uID, data, barAmount, yValues, maxValue);
  // Set options to the created Chart
  setOptions(uID, barAmount, options);
  // Include animation "barber-shop" like
  animateInnerBar(uID);
  // Apply all static CSS to dynamic HTML using object of Styles (chartStyles)
  Object.keys(chartStyles).map((x) => $( x === '*' ? x : '.' + uID + x).css(chartStyles[x]));

  if (options.indicators && options.indicators.length > 0) {
    options.indicators.map((x, ix) => {
      $('.' + uID + 'indicators').append('<div class="' + uID + 'ind' + (ix + 1) + '">' + x.name + '</div>');
      $('.' + uID + 'ind' + (ix + 1)).css({'display': 'inline', 'padding': '5px', 'background': x.background, 'color': x.color, 'border-radius': '10px', 'margin': '0 10px 0 10px'});
    });
  }
}

function setMainLayout(uID, holder, title) {
  const layout = '<div class="' + uID + 'wrapper"><div class="' + uID + 'title"><span>' +
    (title || 'Bar Chart') + '</span><div class="' + uID + 'indicators"></div></div><div class="' + uID + 'yAxis"></div><div class="' + uID + 'chart"></div>' +
    '<div class="' + uID + 'labels"></div></div>';
  $(holder).append(layout);
}

function getMaxValue(obj) {
  let max = 0;
  Object.keys(obj).map((key) => {
    let sum = 0;
    for (const o of obj[key]) sum += o.val;
    max = sum > max ? sum : max;
  });
  return max;
}

function getYValues(arrLength, max) {
  let yValues = [...Array(arrLength).fill(0)];
  yValues = yValues.map((x, ix) => (max / yValues.length * (yValues.length - ix)).toFixed(0));
  return yValues;
}

function setGrid(uID, barAmount) {
  $('.' + uID + 'chart').css({'grid-template-columns': 'repeat(' + barAmount + ', 1fr)'});
  $('.' + uID + 'labels').css({'grid-template-columns': 'repeat(' + barAmount + ', 1fr)'});
}

function createChart(uID, data, barAmount, yValues, max) {
  for (let i = 0; i < barAmount; i++) {
    const key = Object.keys(data)[i];
    $('.' + uID + 'yAxis').append('<div class="' + uID + 'yAx ' + uID + 'y">' + yValues[i] + '</div>');
    $('.' + uID + 'chart').append('<div class="' + uID + 'row ' + uID + 'row' + (i + 1) + '"></div>');
    $('.' + uID + 'chart').append('<div class="' + uID + 'col ' + uID + 'col' + (i + 1) + '"></div>');
    $('.' + uID + 'labels').append('<div class="' + uID + 'label ' + uID + 'l' + (i + 1) + '">' + key + '</div>');
    $('.' + uID + 'row' + (i + 1)).css({'grid-row': (i + 1)});
    $('.' + uID + 'col' + (i + 1)).css({'grid-column': (i + 1)});
    $('.' + uID + 'row' + (i + 1)).css({'background': i % 2 === 0 ? '#d5d5d5' : '#f2f2f2'});
    let bottom = 0;
    for (let j = 0; j < data[key].length; j++) {
      $.keyframe.define([{'name': uID + 'barAnim' + (i + 1) + (j + 1), '0%': {'height': 0}, '100%': {'height': 100}}]);
      $('.' + uID + 'col' + (i + 1)).append('<div class="' + uID + 'bar ' + uID + 'bar' + (i + 1) + (j + 1) + '"><span class="' + uID + 'percent">' + data[key][j].val + '</span></div>');
      $('.' + uID + 'bar' + (i + 1) + (j + 1)).css({'height': (data[key][j].val / max * 100) + '%', 'bottom': bottom + '%'});
      bottom += (data[key][j].val / max * 100);
      $('.' + uID + 'bar' + (i + 1) + (j + 1)).css({'animation': uID + 'barAnim' + (i + 1) + (j + 1) + ' 1.5s ease-out', 'background': data[key][j].color});
      if (data[key].length - j === 1) {
        $('.' + uID + 'bar' + (i + 1) + (j + 1)).css({'border-top-right-radius': '10px', 'border-top-left-radius': '10px'});
      }
    }
  }
}

function setOptions(uID, barAmount, options) {
  $('.' + uID + 'col').css({'grid-row': '1/' + (barAmount + 1)});
  $('.' + uID + 'row').css({'grid-column': '1/' + (barAmount + 1)});
  $('.' + uID + 'chart').css({'grid-auto-rows': 'minmax(' + options.height + ', auto)'});
  $('.' + uID + 'title').css({'color': options.titleColor, 'font-size': options.titleFontSize});
  $('.' + uID + 'bar').css({'width': (100 - options.barSpacing) + '%', 'left': (options.barSpacing / 2) + '%'});
  $('.' + uID + 'percent').css({'color': options.labelColor, 'bottom': options.labelPosition === 'top' ? '85%' : options.labelPosition === 'centre' ? '45%' : '10%'});
  $('.' + uID + 'percent').css({'left': ((100 - options.barSpacing) / 2 + 10) + '%'});
}

function animateInnerBar(uID) {
  $('head').append($('<style>.' + uID + 'bar::after {position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: "";background-size: 100%;background-image: linear-gradient(25deg, #fff 25%,rgba(0, 0, 0, 0) 25%,rgba(0, 0, 0, 0) 50%,#fff 50%,#fff 75%,rgba(0, 0, 0, 0));background-size: 200% 50%;opacity: 0.2;animation: ' + uID + 'barInner 2s infinite linear;}</style>'));
  $.keyframe.define([{'name': uID + 'barInner', '0%': {'background-position': '0 100%'}, '100%': {'background-position-y': '30px 0%'}}]);
}

const chartStyles = {
  '*': {
    'margin': '10 8px 0 0',
    'font-family': 'Verdana',
  },
  'wrapper': {
    'display': 'grid',
    'grid-template-columns': '1fr 10fr',
  },
  'title': {
    'margin': '40px 0 40px 0',
    'grid-column': '1/3',
    'grid-row': 1,
    'text-align': 'center',
  },
  'yAxis': {
    'grid-column': '1/2',
    'grid-row': 2,
    'display': 'grid',
    'width': 'auto',

  },
  'yAx': {
    'text-align': 'right',
    'margin-top': '-10px',
    'margin-right': '15px',
  },
  'chart': {
    'grid-column': '2/3',
    'grid-row': 2,
    'display': 'grid',
  },
  'labels': {
    'height': '50px',
    'grid-column': '2/3',
    'grid-row': 3,
    'display': 'grid',
  },
  'label': {
    'margin-top': '10px',
    'text-align': 'center',
    'font-weight': 'bold',
  },
  'row': {
    'border-bottom': '#ccc 1px solid',
  },
  'col': {
    'position': 'relative',
  },
  'bar': {
    'position': 'absolute',
    'border': '#999 1px solid',
    'text-align': 'center',
  },
  'percent': {
    'position': 'absolute',
    'display': 'inline-block',
    'font-weight': 'bold',
  },
  'indicators': {
    'display': 'flexbox',
    'font-size': '12pt',
    'width': '100%',
    'margin': '20px 0 -15px 0',
  },
};
