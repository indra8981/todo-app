import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from 'react-bootstrap/Toast'

function Toastt(props) {
    console.log(props)
  return (
    <div
  aria-live="polite"
  aria-atomic="true"
  style={{
    position: 'absolute',
    minHeight: '200px',
    top: 70,
    right: 20,
  }}
>
  <div
    style={{
      position: 'relative',
      top: 0,
      right: 0,
    }}
  >
<Toast
    show={props.showToast}
    onClose={props.closeToast}
    delay={3000} autohide
  >
    <Toast.Header>
      <strong className="mr-auto">{props.heading}</strong>
    </Toast.Header>
    <Toast.Body>{props.body}</Toast.Body>
  </Toast>
</div>
</div>
  );
}

export default Toastt;
