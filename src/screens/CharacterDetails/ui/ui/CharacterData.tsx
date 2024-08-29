import { memo, useCallback } from 'react';
import {
    StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';
import { GetCharacters } from '@/shared/services/interfaces/get-characters';
import { AccordionCard } from '@/widgets/AccordionCard/AccordionCard';
import { globalStylesVariables } from '@/app/styles/globalStylesVariables';
import { RNText } from '@/shared/ui/Text';

interface CharacterDataProps {
    item: GetCharacters;
    readonly?: boolean;
    style?: StyleProp<ViewStyle>;
}

const details = [
    { fieldName: 'house', label: 'House' },
    { fieldName: 'dateOfBirth', label: 'Date of Birth' },
    { fieldName: 'actor', label: 'Actor' },
    { fieldName: 'species', label: 'Species' },
];

export const CharacterData = memo((props: CharacterDataProps) => {
    const { style, item, readonly = false } = props;

    const renderItem = useCallback(
        (detail: { fieldName: keyof GetCharacters; label: string }, index: number) => {
            const value = item[detail.fieldName];
            const displayValue = value ? value.toString().trim() : '—';

            return (
                <View key={detail.fieldName} style={styles.additionalElement}>
                    <View style={styles.fieldBox}>
                        <View style={styles.prefix}>
                            <RNText
                                text={(index + 1).toString()}
                                textWeight="600"
                                center
                                style={styles.prefixText}
                                lineHeight={16}
                            />
                        </View>
                        <RNText text={detail.label || ''} textWeight="700" lineHeight={20} />
                    </View>
                    <RNText
                        style={{ paddingLeft: 28 }}
                        type="default"
                        textWeight="400"
                        lineHeight={24}
                        text={displayValue}
                    />
                </View>
            );
        },
        [item],
    );

    return (
        <AccordionCard style={[style, styles.view]} firstLabel={item.name}>
            {readonly ? (
                <RNText text="ACCESS DENIED" textWeight="700" textSize="l" />
            ) : (
                details.map(renderItem)
            )}
        </AccordionCard>
    );
});

const styles = StyleSheet.create({
    additionalElement: {
        alignItems: 'flex-start',
        flex: 1,
        padding: 8,
        paddingBottom: 0,
    },
    fieldBox: { flexDirection: 'row', width: '90%' },
    prefix: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: globalStylesVariables.specialBackground,
        borderRadius: 34,
        height: 20,
        justifyContent: 'center',
        marginRight: 8,
        width: 20,
    },
    prefixText: { fontSize: 12 },
    view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 14,
        paddingRight: 16,
        paddingVertical: 12,
    },
});
