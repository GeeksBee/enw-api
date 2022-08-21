class Twilio {
    private;
    messages: Messages;

    constructor(private accountSid: string, private authToken: string) {
        this.messages = new Messages();
        return this;
    }
}

class Messages {
    constructor() {}
    public create(props: { body: string; from: string; to: string }): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(props.body);
            });
        });
    }
}

export default Twilio;
