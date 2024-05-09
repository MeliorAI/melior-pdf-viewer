import { useCallback, useEffect, useMemo, useState } from 'react';
import mqtt, { MqttClient } from 'mqtt';
import { getUserConfig } from '../utils/userConfig';

interface Config {
    clientId: string;
    topics: string[];
}

interface WSEvents {
    onConnect?: () => void;
    onMessage?: (topic: string, message: object) => void;
}

export default function useWebsocket({ clientId, topics }: Config, events?: WSEvents) {
    const [client, setClient] = useState<MqttClient>();
    const config = useCallback(() => getUserConfig(), [])();
    const websocketBaseUrl = useMemo(() => config?.websocketBaseUrl, [config]);

    if (!websocketBaseUrl)
        throw new Error('websocketBaseUrl is not defined. Please check Tenant metadata.');

    const mqttConnect = () => {
        const c = mqtt.connect(websocketBaseUrl, {
            clientId: `${clientId}-${Math.random().toString(16).substr(2, 8)}`,
            clean: false,
        });
        setClient(c);
    };

    useEffect(() => {
        mqttConnect();
    }, []);

    useEffect(() => {
        if (client) {
            client.on('connect', () => {
                events?.onConnect && events.onConnect();

                topics.forEach((topic) => {
                    client.subscribe(topic);
                });
            });

            client.on('message', (topic, message) => {
                events?.onMessage && events.onMessage(topic, JSON.parse(message.toString()));
            });
        }

        return () => {
            client?.end();
        };
    }, [client]);

    return { wsClient: client };
}
