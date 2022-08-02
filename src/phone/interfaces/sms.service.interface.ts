export type SendMessagePayload = {
    body: string;
    from: string;
    to: string;
};

interface SmsServiceInterface {
    sendMessage(sendMessagePayload: SendMessagePayload): Promise<string>;
}
export default SmsServiceInterface;
