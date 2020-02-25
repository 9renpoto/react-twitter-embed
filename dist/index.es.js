import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import ExecutionEnvironment from 'exenv';

var twitterWidgetJs = 'https://platform.twitter.com/widgets.js';

var TwitterTimelineEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterTimelineEmbed, _Component);

  function TwitterTimelineEmbed(props) {
    var _this;

    _classCallCheck(this, TwitterTimelineEmbed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterTimelineEmbed).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterTimelineEmbed, [{
    key: "buildChromeOptions",
    value: function buildChromeOptions(options) {
      options.chrome = '';

      if (this.props.noHeader) {
        options.chrome = options.chrome + ' noheader';
      }

      if (this.props.noFooter) {
        options.chrome = options.chrome + ' nofooter';
      }

      if (this.props.noBorders) {
        options.chrome = options.chrome + ' noborders';
      }

      if (this.props.noScrollbar) {
        options.chrome = options.chrome + ' noscrollbar';
      }

      if (this.props.transparent) {
        options.chrome = options.chrome + ' transparent';
      }

      return options;
    }
  }, {
    key: "buildOptions",
    value: function buildOptions() {
      var options = Object.assign({}, this.props.options);

      if (this.props.autoHeight) {
        options.height = this.refs.embedContainer.parentNode.offsetHeight;
      }

      options = Object.assign({}, options, {
        theme: this.props.theme,
        linkColor: this.props.linkColor,
        borderColor: this.props.borderColor,
        lang: this.props.lang
      });
      return options;
    }
  }, {
    key: "renderWidget",
    value: function renderWidget(options) {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (!this.isMountCanceled) {
        window.twttr.widgets.createTimeline({
          sourceType: this.props.sourceType,
          screenName: this.props.screenName,
          userId: this.props.userId,
          ownerScreenName: this.props.ownerScreenName,
          slug: this.props.slug,
          id: this.props.id || this.props.widgetId,
          url: this.props.url
        }, this.refs.embedContainer, options).then(function (element) {
          _this2.setState({
            isLoading: false
          });

          if (onLoad) {
            onLoad(element);
          }
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterTimelineEmbed, aborting load.');
            return;
          }

          var options = _this3.buildOptions();
          /** Append chrome options */


          options = _this3.buildChromeOptions(options);

          _this3.renderWidget(options);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterTimelineEmbed;
}(Component);

_defineProperty(TwitterTimelineEmbed, "propTypes", {
  /**
       * This can be either of profile, likes, list, collection, URL, widget
       */
  sourceType: PropTypes.oneOf(['profile', 'likes', 'list', 'collection', 'url', 'widget']).isRequired,

  /**
       * username of twitter handle as String
       */
  screenName: isRequiredIf(PropTypes.string, function (props) {
    return !props.hasOwnProperty('userId') && (props.sourceType === 'profile' || props.sourceType === 'likes');
  }),

  /**
       * UserId of twitter handle as number
       */
  userId: isRequiredIf(PropTypes.number, function (props) {
    return !props.hasOwnProperty('screenName') && (props.sourceType === 'profile' || props.sourceType === 'likes');
  }),

  /**
       * To show list, used along with slug
       */
  ownerScreenName: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('id');
  }),

  /**
       * To show list, used along with ownerScreenName
       */
  slug: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('id');
  }),

  /**
       * To show list, unique list id
       * Also used with collections, in that case its valid collection id
       */
  id: isRequiredIf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]), function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('ownerScreenName') && !props.hasOwnProperty('slug') || props.sourceType === 'collection';
  }),

  /**
       * To show twitter content with url.
       * Supported content includes profiles, likes, lists, and collections.
       */
  url: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'url';
  }),

  /**
       * To show custom widget
       */
  widgetId: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'widget';
  }),

  /**
       * Additional options to pass to twitter widget plugin
       */
  options: PropTypes.object,

  /**
       * Automatically fit into parent container height
       */
  autoHeight: PropTypes.bool,

  /**
       * With dark or light theme
       */
  theme: PropTypes.oneOf(['dark', 'light']),

  /**
       * With custom link colors. Note: Only Hex colors are supported.
       */
  linkColor: PropTypes.string,

  /**
       * With custom border colors. Note: Only Hex colors are supported.
       */
  borderColor: PropTypes.string,

  /**
       * Hide the header from timeline
       */
  noHeader: PropTypes.bool,

  /**
       * Hide the footer from timeline
       */
  noFooter: PropTypes.bool,

  /**
       * Hide the border from timeline
       */
  noBorders: PropTypes.bool,

  /**
       * Hide the scrollbars
       */
  noScrollbar: PropTypes.bool,

  /**
       * Enable Transparancy
       */
  transparent: PropTypes.bool,

  /**
       * Custom language code. Supported codes here: https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview.html
       */
  lang: PropTypes.string,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterShareButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterShareButton, _Component);

  function TwitterShareButton(props) {
    var _this;

    _classCallCheck(this, TwitterShareButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterShareButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterShareButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterShareButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createShareButton(_this2.props.url, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterShareButton;
}(Component);

_defineProperty(TwitterShareButton, "propTypes", {
  /**
  * Url for sharing
  */
  url: PropTypes.string.isRequired,

  /**
  * Additional options for overriding config. Details at : https://dev.twitter.com/web/tweet-button/parameters
  */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterFollowButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterFollowButton, _Component);

  function TwitterFollowButton(props) {
    var _this;

    _classCallCheck(this, TwitterFollowButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterFollowButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterFollowButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterFollowButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createFollowButton(_this2.props.screenName, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterFollowButton;
}(Component);

_defineProperty(TwitterFollowButton, "propTypes", {
  /**
       * Username of twitter user which will be followed on click
       */
  screenName: PropTypes.string.isRequired,

  /**
       * Additional options to be added to the button
       */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterHashtagButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterHashtagButton, _Component);

  function TwitterHashtagButton(props) {
    var _this;

    _classCallCheck(this, TwitterHashtagButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterHashtagButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterHashtagButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterHashtagButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createHashtagButton(_this2.props.tag, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterHashtagButton;
}(Component);

_defineProperty(TwitterHashtagButton, "propTypes", {
  /**
       * Tag name for hashtag button
       */
  tag: PropTypes.string.isRequired,

  /**
       * Additional options to be added to the button
       */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterMentionButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterMentionButton, _Component);

  function TwitterMentionButton(props) {
    var _this;

    _classCallCheck(this, TwitterMentionButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterMentionButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterMentionButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterMentionButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createMentionButton(_this2.props.screenName, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterMentionButton;
}(Component);

_defineProperty(TwitterMentionButton, "propTypes", {
  /**
   * Username to which you will need to tweet
   */
  screenName: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterTweetEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterTweetEmbed, _Component);

  function TwitterTweetEmbed(props) {
    var _this;

    _classCallCheck(this, TwitterTweetEmbed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterTweetEmbed).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterTweetEmbed, [{
    key: "renderWidget",
    value: function renderWidget() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (!window.twttr) {
        console.error('Failure to load window.twttr in TwitterTweetEmbed, aborting load.');
        return;
      }

      if (!this.isMountCanceled) {
        window.twttr.widgets.createTweet(this.props.tweetId, this.refs.embedContainer, this.props.options).then(function (element) {
          _this2.setState({
            isLoading: false
          });

          if (onLoad) {
            onLoad(element);
          }
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          _this3.renderWidget();
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterTweetEmbed;
}(Component);

_defineProperty(TwitterTweetEmbed, "propTypes", {
  /**
       * Tweet id that needs to be shown
       */
  tweetId: PropTypes.string.isRequired,

  /**
       * Additional options to pass to twitter widget plugin
       */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterMomentShare =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterMomentShare, _Component);

  function TwitterMomentShare(props) {
    var _this;

    _classCallCheck(this, TwitterMomentShare);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterMomentShare).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterMomentShare, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterMomentShare, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createMoment(_this2.props.momentId, _this2.refs.shareMoment, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "shareMoment"
      }));
    }
  }]);

  return TwitterMomentShare;
}(Component);

_defineProperty(TwitterMomentShare, "propTypes", {
  /**
   * id of Twitter moment to show
   */
  momentId: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterDMButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterDMButton, _Component);

  function TwitterDMButton(props) {
    var _this;

    _classCallCheck(this, TwitterDMButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterDMButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterDMButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterDMButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createDMButton(_this2.props.id, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterDMButton;
}(Component);

_defineProperty(TwitterDMButton, "propTypes", {
  /**
  * Twitter user id for DM button
  */
  id: PropTypes.number.isRequired,

  /**
  * Additional options to be added to the button
  */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterVideoEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterVideoEmbed, _Component);

  function TwitterVideoEmbed(props) {
    var _this;

    _classCallCheck(this, TwitterVideoEmbed);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterVideoEmbed).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterVideoEmbed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterVideoEmbed, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createVideo(_this2.props.id, _this2.refs.embedContainer).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterVideoEmbed;
}(Component);

_defineProperty(TwitterVideoEmbed, "propTypes", {
  /**
       * Id of video tweet.
       */
  id: PropTypes.string.isRequired,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

var TwitterOnAirButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterOnAirButton, _Component);

  function TwitterOnAirButton(props) {
    var _this;

    _classCallCheck(this, TwitterOnAirButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TwitterOnAirButton).call(this, props));
    _this.state = {
      isLoading: true
    };
    return _this;
  }

  _createClass(TwitterOnAirButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var onLoad = this.props.onLoad;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitterWidgetJs, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterOnAirButton, aborting load.');
            return;
          }

          if (!_this2.isMountCanceled) {
            window.twttr.widgets.createPeriscopeOnAirButton(_this2.props.username, _this2.refs.embedContainer, _this2.props.options).then(function (element) {
              _this2.setState({
                isLoading: false
              });

              if (onLoad) {
                onLoad(element);
              }
            });
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      var isLoading = this.state.isLoading;
      var placeholder = this.props.placeholder;
      return React.createElement(React.Fragment, null, isLoading && placeholder, React.createElement("div", {
        ref: "embedContainer"
      }));
    }
  }]);

  return TwitterOnAirButton;
}(Component);

_defineProperty(TwitterOnAirButton, "propTypes", {
  /**
   * Username for which you require periscope on air button
   */
  username: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object,

  /**
   * Placeholder while tweet is loading
   */
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  /**
   * Function to execute after load, return html element
   */
  onLoad: PropTypes.func
});

export { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton };
//# sourceMappingURL=index.es.js.map
