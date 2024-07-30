import React, { forwardRef } from "react";
import { JSX } from "react/jsx-runtime";

export function withStuffFunction(Comp) {

    const hocComponent = forwardRef((props: JSX.IntrinsicAttributes, ref) => {
        return (
            <Comp addStuff={ ()=>{} }
                ref={ref}
                {...props}
            />
        )
    })
    return hocComponent;
}

export const withStuffClass = (Comp) => {
    class Stuff extends React.Component {
        addStuff = () => {}

        render() {
            return (
                <Comp
                    ref={this.props.innerRef}
                    addStuff={this.addStuff}
                    {...this.props}
                />
            );
        }
    }

    const hocComponent = React.forwardRef((props, ref) => {
        return (
            <Stuff
                innerRef={ref}
                {...props}
            />
        );
    });

    return hocComponent;
};

export const withStuffFC = (Comp:React.FC) => {
    const hocComponent = forwardRef((props: JSX.IntrinsicAttributes, ref) => {
        return (
            <Comp 
                ref={ref}
                {...props}
            />
        )
    })
    return hocComponent;
};