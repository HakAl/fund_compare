import React from "react";
import {Fragment} from "react";

const Error = ({error, message}) => (
    <Fragment>{error && message}</Fragment>
)

export default Error;