import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';

import { signInUser } from '../store/actions/authActions';
import { Container } from '../styles/styledComponents';

function Login(props) {
  if (props.auth.uid) return <Redirect from="/login" to='/' noThrow />;

  return (
    <Container>
      <h1>Zaloguj się</h1>
      <button onClick={() => props.signIn()}>
        zaloguj się przez Google
      </button>

      <p>
        <span>Nie masz konta Google? Mozesz je załozyć </span>
        <a href="https://support.google.com/mail/answer/56256?hl=pl" target="_blank" rel="noopener noreferrer">tutaj</a>
      </p>
    </Container>
  );
};


Login.propTypes = {
  signIn: PropTypes.func,
  auth: PropTypes.shape({
    uid: PropTypes.string
  })
};

const mapDispatchToProps = (dispatch) => {
  return {
   signIn: () => dispatch(signInUser())
  };
};

const mapStateToProps = (state) => {
  return {
   auth: state.firebase.auth
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
