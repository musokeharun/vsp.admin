import React, {useState} from 'react';
import Input from "../../common/Input";
import {login} from "./authAPI";

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async () => {
        await login(email, password);
    }

    return (
        <div className="row flex-center min-vh-100 py-6">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card">
                    <div className="card-body p-4 p-sm-5">
                        <div className="row flex-between-center mb-2">
                            <div className="col-auto">
                                <h5>Log in</h5>
                            </div>
                        </div>
                        <form onSubmit={e => {
                            e.preventDefault();
                            handleSubmit().then(() => {
                                console.log("Submitted")
                            });
                        }}>
                            <Input
                                required
                                autoComplete={"true"}
                                name={"email"} type={"email"} label={"Email"}
                                onChange={e => setEmail(e.currentTarget.value)}/>
                            <Input
                                required
                                autoComplete={"true"}
                                minLength={6}
                                name={"password"} type={"password"} label={"Password"}
                                onChange={e => setPassword(e.currentTarget.value)}/>

                            <div className="mb-3">
                                <button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
