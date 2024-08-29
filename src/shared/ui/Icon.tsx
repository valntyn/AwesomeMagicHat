import React, { memo } from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    style?: React.CSSProperties;
    Svg: any;
    inverted?: boolean;
    disabled?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const {
        style, Svg, inverted, disabled, ...otherProps
    } = props;

    return <Svg style={[style, { opacity: disabled ? 0.7 : 1 }]} {...otherProps} />;
});
