import React from 'react';
// import translations from './translations';

export const ShareDataUptoEndContext = React.createContext();

class ShareDataUptoEndProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'english',
            Notification:[]
        }
    }
    SetNotification = (language) => {
        console.log('language>>>>>>>',language)
        // global.language = language

        this.setState({ Notification: [...Notification ,language] })
    }
    render() {
        return (
            <ShareDataUptoEndContext.Provider
                value={{
                    ...this.state,
                    SetNotification: this.SetNotification
                }}
            >
                {this.props.children}
            </ShareDataUptoEndContext.Provider>
        );
    }
}
export default ShareDataUptoEndProvider;