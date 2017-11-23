var myModule = angular.module('Angello', []);

myModule.factory('AngelloHelper', function() {
    //Factory와 service의 차이?
    //http://www.haruair.com/blog/3223
    //둘 기능다 singleton 패턴을 사용한다.

    //우선은 service는 factory를 이용하여 정의된 기능
    //service는 public method와 변수를 이용할 때 사용
    //factory는 static method를 이용할 때 사용
    //둘의 가장 큰 차이는 객체가 생성될 때 <- 이 둘의 차이를 명확하게 이해하기 어렵다.
    //service는 생성자가 실행되어서 변수들이 전부 초기화되는 것으로 보이고, factory는 아닌 것 같다.
    var buildIndex = function (source, property) {
        var tempArray = [];

        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }

        return tempArray;
    };

    return {
        buildIndex: buildIndex
    };
});

myModule.service('AngelloModel', function() {
    var service = this,
        statuses = [
            {name: 'Back Log'},
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'},
            {name: 'Done'}
        ],
        types = [
            {name: 'Feature'},
            {name: 'Enhancement'},
            {name: 'Bug'},
            {name: 'Spike'}
        ],
        stories = [
            {
                title: '첫 번째 스토리',
                description: '첫 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '해야할 일',
                type: '기능', 
                reporter: '웹지니',
                assignee: '웹지니'
            },
            {
                title: '두 번째 스토리',
                description: '두 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '백로그',
                type: '기능',
                reporter: '웹지니',
                assignee: '웹지니'
            },
            {
                title: '세 번째 스토리',
                description: '세 번째 사용자 스토리',
                criteria: '요구사항 정리 중...',
                status: '코드 리뷰',
                type: '개선',
                reporter: '웹지니',
                assignee: '웹지니'
            }
        ];
    service.getStories = function () {
        return stories;
    };

    service.getStatuses = function () {
        return statuses;
    };

    service.getTypes = function () {
        return types;
    };

    service.getStories = function () {
        return stories;
    };
});

myModule.controller('MainCtrl', function(AngelloModel, AngelloHelper) {
    //AngelloModel : Dependency Injection
    var main = this;

    main.types = AngelloModel.getTypes();
    main.statuses = AngelloModel.getStatuses();
    main.stories = AngelloModel.getStories(); // service에서 data를 받아오는 방법
    main.typesIndex = AngelloHelper.buildIndex(main.types, 'name');
    main.statusesIndex = AngelloHelper.buildIndex(main.statuses, 'name');

    /*main.stories = [
        {
            title: '첫 번째 스토리',
            description: '첫 번째 사용자 스토리',
            criteria: '요구사항 정리 중...',
            status: '해야할 일',
            type: '기능', 
            reporter: '웹지니',
            assignee: '웹지니'
        },
        {
            title: '두 번째 스토리',
            description: '두 번째 사용자 스토리',
            criteria: '요구사항 정리 중...',
            status: '백로그',
            type: '기능',
            reporter: '웹지니',
            assignee: '웹지니'
        },
        {
            title: '세 번째 스토리',
            description: '세 번째 사용자 스토리',
            criteria: '요구사항 정리 중...',
            status: '코드 리뷰',
            type: '개선',
            reporter: '웹지니',
            assignee: '웹지니'
        }
    ];*/


    main.setCurrentStory = function (story) {
        main.currentStory = story;
        main.currentStatus = main.statusesIndex[story.status];
        main.currentType = main.typesIndex[story.type];
    };

    main.createStory = function() {
        main.stories.push({
            title: '새 사용자 스토리',
            description: '설명을 입력하세요',
            criteria: '요구사항 정리중 ...',
            status: '백로그',
            type: '기능',
            reporter: '미정',
            assignee: '미정'
        });
    }
    //기존 코드
    /*main.createStory = function() {
        main.stories.push({
            title: 'New Story',
            description: 'Description pending.',
            criteria: 'Criteria pending.',
            status: 'Back Log',
            type: 'Feature',
            reporter: 'Pending',
            assignee: 'Pending'
        });
    };*/

    main.setCurrentStatus = function (status) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.status = status.name;
        }
    };

    main.setCurrentType = function (type) {
        if (typeof main.currentStory !== 'undefined') {
            main.currentStory.type = type.name;
        }
    };
});

myModule.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    }; //json object를 리턴(DDO)
});
/* 기존 코드
myModule.directive('story', function() {
    return {
        scope: true,
        replace: true,
        template: '<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
    }
});*/