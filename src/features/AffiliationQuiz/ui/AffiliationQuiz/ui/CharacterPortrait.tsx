import { memo } from 'react';
import {
    Dimensions, Image, StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { RNText } from '@/shared/ui/Text';

interface CharacterPortraitProps {
    image: string;
    style?: StyleProp<ViewStyle>;
    name?: string;
}

const { width } = Dimensions.get('window');

export const CharacterPortrait = memo((props: CharacterPortraitProps) => {
    const { style, image, name = '' } = props;

    return (
        <View style={[style, styles.view]}>
            <Image
                source={image ? { uri: image } : require('@/shared/assets/png/no-image.jpg')}
                style={styles.image}
            />
            <View style={{ height: 30 }}>
                <RNText text={name || ''} textWeight="600" />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    image: {
        aspectRatio: 2 / 3,
        height: 170,
        width: width * 0.35,
    },
    view: {
        alignItems: 'center',
        gap: 4,
        justifyContent: 'center',
    },
});
