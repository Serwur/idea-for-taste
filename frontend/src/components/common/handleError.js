import React from 'react';

export default function (ComponentWhichCanThrowError) {
    return class HandleError extends React.Component {
        render() {
            try {
                return <ComponentWhichCanThrowError {...this.props} />;
            } catch (error) {
                console.log(JSON.stringify(error, null, 2));
                return (
                    <div className="row">
                        <div className="col-8 offset-2">
                            <h2>Uops... something went wrong...</h2>
                            <p className="alert alert-danger">{error}</p>
                        </div>
                    </div>
                );
            }
        }
    }
}