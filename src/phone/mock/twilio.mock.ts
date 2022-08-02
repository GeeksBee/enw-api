class Twilio {
    constructor(accountSid: string, authToken: string) {
        return this;
    }

    messages: Messages;
}

class Messages {
    create(props: { body: string; from: string; to: string }): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(props.body);
            });
        });
    }
}

export default Twilio;
