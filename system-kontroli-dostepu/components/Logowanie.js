import React from 'react';
import styles from '../styles/Home.module.css'


export default class Logowanie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            attempt: 5,
            userNameAvailable: false,
            passwordAvailable: false,
            submitAvailable: false
        };

        // This binding is necessary to make `this` work in the callback
        this.handleValidate = this.handleValidate.bind(this);
    };
    render() {
        return (                    
                    <div class="container">
                        <h2>Logowanie</h2>
                        <div class="row">
                            <div class="col-md-6 col-md-offset-3">
                                <form>
                                    {/* <!-- Email input --> */}
                                    <div class="form-outline mb-4">
                                        <input type="email" id="form2Example1" class="form-control" />
                                        <label class="form-label" for="form2Example1">Email address</label>
                                    </div>

                                    {/* <!-- Password input --> */}
                                    <div class="form-outline mb-4">
                                        <input type="password" id="form2Example2" class="form-control" />
                                        <label class="form-label" for="form2Example2">Password</label>
                                    </div>

                                    {/* <!-- 2 column grid layout for inline styling --> */}
                                    <div class="row mb-4">
                                        <div class="col d-flex justify-content-center">
                                            {/* <!-- Checkbox --> */}
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value=""  />
                                                <label class="form-check-label" for="form2Example31"> Remember me </label>
                                            </div>
                                        </div>

                                       
                                    </div>

                                    {/* <!-- Submit button --> */}
                                    <button  type="button" class="btn btn-primary btn-block mb-4 " disabled={this.state.submitAvailable} onClick={this.handleValidate}>Sign in</button>

                                    {/* <!-- Register buttons --> */}
                                    <div class="text-center">
                                        <p>Not a member? <a href="#!">Register</a></p>
                                        <p>or sign up with:</p>
                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-facebook-f"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-google"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-twitter"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i class="fab fa-github"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        )
    }

    handleValidate() {
        // decrese attempt by 1
        this.setState({ attempt: this.state.attempt - 1 });

        alert("Pozostało " + this.state.attempt + " prób na wpisanie poprawnych danych;");
        // Disabling fields after 3 attempts.
        if (this.state.attempt <= 0) {
            this.setState({ userNameAvailable: true, passwordAvailable: true, submitAvailable: true });
        }
    }
}