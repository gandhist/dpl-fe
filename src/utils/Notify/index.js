// tl - notification will be rendered in the top-left corner of the screen
// tc - notification will be rendered in the top-center corner of the screen
// tr - notification will be rendered in the top-right corner of the screen
// bl - notification will be rendered in the bottom-left corner of the screen
// bc - notification will be rendered in the bottom-center corner of the screen
// br - notification will be rendered in the bottom-right corner of the screen

// primary
// secondary
// success
// danger
// warning
// info
// light
// dark
export const notify = ({ place, message, color, ref }) => {
  var options = {};
  options = {
    place: place,
    message: (
      <div>
        <div>
          {message}
        </div>
      </div>
    ),
    type: color,
    icon: "nc-icon nc-bell-55",
    autoDismiss: 7,
  };
  return ref.current.notificationAlert(options);
};