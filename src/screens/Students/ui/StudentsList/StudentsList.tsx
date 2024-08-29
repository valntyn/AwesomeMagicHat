import { memo } from 'react';
import {
    ListRenderItem, StyleProp, View, ViewStyle,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StudentItem } from '@/screens/Students/ui/StudentItem/StudentItem';
import { Student } from '@/features/AffiliationQuiz/model/types/Student';

interface StudentsListProps {
    data: Student[];
    style?: StyleProp<ViewStyle>;
}

export const StudentsList = memo((props: StudentsListProps) => {
    const { style, data } = props;

    const renderStudentItem: ListRenderItem<Student> = ({ item }) => {
        return <StudentItem item={item} key={item.id} />;
    };

    return (
        <Animated.View style={[{ flex: 1 }, style]}>
            <Animated.FlatList
                data={data}
                entering={FadeIn.duration(200)}
                renderItem={renderStudentItem}
                keyExtractor={(item) => item.id}
                ListFooterComponent={<View style={{ padding: 4 }} />}
                ListHeaderComponent={<View style={{ padding: 4 }} />}
                contentContainerStyle={{ gap: 10 }}
            />
        </Animated.View>
    );
});
