module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['module:@react-native/babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['.'],
                    alias: {
                        '@': './src/',
                    },
                },
            ],

            // always the last
            'react-native-reanimated/plugin',
        ],
    };
};
