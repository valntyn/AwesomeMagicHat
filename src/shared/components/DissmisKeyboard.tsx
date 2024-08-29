import { Keyboard, Pressable } from 'react-native';
import { ReactNode } from 'react';

export const DismissKeyboard = ({ children }: { children: ReactNode }) => (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        {children}
    </Pressable>
);
