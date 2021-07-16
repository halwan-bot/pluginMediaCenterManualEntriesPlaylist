xdescribe('Unit : mediaCenterPlugin WidgetHome Controller', function () {
    beforeEach(module('mediaCenterWidget'));

    var $window, $controller, rootScope, $scope, WidgetHome, COLLECTIONS, DB, Buildfire, MediaCenterInfo, Messaging, EVENTS, PATHS, Location, Orders;


    beforeEach(inject(function (_$controller_, _$window_, _DB_, _COLLECTIONS_, _$rootScope_, _Buildfire_, _Messaging_, _EVENTS_, _PATHS_, _Location_, _Orders_) {

        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        DB = _DB_;
        COLLECTIONS = _COLLECTIONS_;
        Buildfire = _Buildfire_;
        Messaging = _Messaging_;
        EVENTS = _EVENTS_;
        PATHS = _PATHS_;
        Location = _Location_;
        Orders = _Orders_;
        rootScope = _$rootScope_;


        WidgetHome = $controller('WidgetHomeCtrl', {
            $scope: $scope,
            $window: $window,
            Buildfire: Buildfire,
            MediaCenterInfo: {
                id: '1',
                data: {
                    design: {
                        listLayout: 'test',
                        backgroundImage: 'test1'
                    },
                    content: {
                        images: [],
                        descriptionHTML: '',
                        description: '',
                        sortBy: 'Manual',
                        rankOfLastItem: 0
                    }
                }
            },
            Messaging: Messaging,
            EVENTS: EVENTS,
            PATHS: PATHS,
            Location: Location,
            Orders: Orders,
            DB: DB
        });
    }));
    describe('Unit : units should be Defined', function () {
        it('it should pass if WidgetHome is defined', function () {
            expect(WidgetHome).toBeDefined();
        });
        it('it should pass if DB is defined', function () {
            expect(DB).not.toBeUndefined();
        });
        it('it should pass if Buildfire is defined', function () {
            expect(Buildfire).not.toBeUndefined();
        });

        it('it should pass if Messaging is defined', function () {
            expect(Messaging).not.toBeUndefined();
        });
        it('it should pass if EVENTS is defined', function () {
            expect(EVENTS).not.toBeUndefined();
        });
        it('it should pass if PATHS is defined', function () {
            expect(PATHS).not.toBeUndefined();
        });
        it('it should pass if Location is defined', function () {
            expect(Location).not.toBeUndefined();
        });
        it('it should pass if WidgetHome.loadMore() is defined', function () {
            expect(WidgetHome.loadMore).toBeDefined();
        });
    });

    describe('WidgetHome.loadMore', function () {
        it('should not change WidgetHome.items when isBusy is true (data is begin fetched)', function () {
            WidgetHome.isBusy = true;
            WidgetHome.items = [];
            WidgetHome.loadMore();
            WidgetHome.refreshItems();
            //Messaging.onReceivedMessage({name:'CHANGE_ROUTE',message:{id:'id1',path:'url'}});
            expect(WidgetHome.items.length).toEqual(0);
        });
    });
    describe('WidgetHome.goToMedia', function () {
        it('should not change WidgetHome.goToMedia when isBusy is true (data is begin fetched)', function () {
            WidgetHome.items=[{id:'id1'}]
            WidgetHome.goToMedia(0);
        });
    });
    describe('WidgetHome.showDescription', function () {
        it('should not change WidgetHome.items when isBusy is true (data is begin fetched)', function () {
            WidgetHome.media={data:{content:{descriptionHTML:'<p>&nbsp;<br></p>'}}};
            WidgetHome.showDescription();
        });
        it('should not change WidgetHome.items when isBusy is true (data is begin fetched)', function () {
            WidgetHome.media={data:{content:{descriptionHTML:'<p><br data-mce-bogus="1"></p>'}}};
            WidgetHome.showDescription();
        });
        it('should not change WidgetHome.items when isBusy is true (data is begin fetched)', function () {
            WidgetHome.media={data:{content:{descriptionHTML:'<p>Hello</p>'}}};
            WidgetHome.showDescription();
        });
    });
});