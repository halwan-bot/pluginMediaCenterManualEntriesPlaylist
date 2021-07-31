(function (angular, window) {
    'use strict';
    angular
        .module('mediaCenterDesign')
        .controller('SettingsCtrl', ['$scope', 'COLLECTIONS', 'DB', 'AppDB', function ($scope, COLLECTIONS, DB, AppDB) {
            var Settings = this;
            Settings.data = {};
            $scope.inputs = {};
            var MediaCenter = new DB(COLLECTIONS.MediaCenter);
            var GlobalPlayListSettings = new AppDB();

            MediaCenter.get().then((getData) => {
                Settings.data = getData.data;
                // if (typeof (Settings.data.content.allowShare) == 'undefined')
                //     Settings.data.content.allowShare = true;
                if (typeof (Settings.data.content.allowSource) == 'undefined')
                    Settings.data.content.allowSource = true;
                // if (typeof (Settings.data.content.transferAudioContentToPlayList) == 'undefined')
                //     Settings.data.content.transferAudioContentToPlayList = false;
                // if (typeof (Settings.data.content.forceAutoPlay) == 'undefined')
                //     Settings.data.content.forceAutoPlay = false;
                if (typeof (Settings.data.design.skipMediaPage) == 'undefined')
                    Settings.data.design.skipMediaPage = true;
                if (typeof (Settings.data.content.autoPlay) == 'undefined')
                    Settings.data.content.autoPlay = false;
                if (typeof (Settings.data.content.autoPlayDelay) == 'undefined')
                    Settings.data.content.autoPlayDelay = { label: "Off", value: 0 };
            }, (err) => {
                console.error(err);
            });

            GlobalPlayListSettings.get().then(result => {
                if (result && result.data && typeof result.data.globalPlaylistLimit !== 'undefined') {
                    $scope.inputs.globalPlaylistLimit = result.data.globalPlaylistLimit;
                } else {
                    $scope.inputs.globalPlaylistLimit = 0;
                };
            })

            Settings.setSettings = () => {
                MediaCenter.save(Settings.data).then(() => {});
            }

            Settings.changeSkipPage = (value) => {
                if (value!=Settings.data.design.skipMediaPage) {
                    if (value === false) {
                        Settings.data.content.autoPlay = false;
                    }
                    Settings.data.design.skipMediaPage = value;
                    MediaCenter.save(Settings.data).then(() => {});
                }
            };

            Settings.setAllowSource = (value) => {
                if(value!=Settings.data.content.allowSource){
                    Settings.data.content.allowSource=value;
                    MediaCenter.save(Settings.data).then(() => {});
                }
            }

            Settings.setAutoPlay = (value) => {
                if (value != Settings.data.content.autoPlay) {
                    if (value === true && Settings.data.content.forceAutoPlay) {
                        Settings.data.content.forceAutoPlay = false;
                        Settings.data.content.transferAudioContentToPlayList = Settings.data.content.forceAutoPlay;
                    }
                    if (value === true) Settings.data.design.skipMediaPage = true;
                    Settings.data.content.autoPlay = value;
                    MediaCenter.save(Settings.data).then(() => {});
                };
            };
            
            Settings.setAutoPlayDelay = (option) => {
                if (option.value != Settings.data.content.autoPlayDelay.value) {
                    Settings.data.content.autoPlayDelay = option;
                    MediaCenter.save(Settings.data).then(() => {});
                }
            };

            Settings.autoPlayDelayOptions = [
                { label: "Off", value: 0 },
                { label: "1s", value: 1 },
                { label: "2s", value: 2 },
                { label: "3s", value: 3 },
                { label: "5s", value: 5 },
            ];

            let delay;
            Settings.setGlobalPlaylistLimit = () => {
                if (delay) clearTimeout(delay);
                delay = setTimeout(() => {
                        GlobalPlayListSettings.save($scope.inputs.globalPlaylistLimit);
                }, 700);
            };
        }]);
})(window.angular, window);
