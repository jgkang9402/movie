let initialState = {
  myList: [
    // {
    //   adult: false,
    //   backdrop_path:
    //     "https://image.tmdb.org/t/p/w500/5jkE2SzR5uR2egEb1rRhF22JyWN.jpg",
    //   genre_ids: [12, 14],
    //   id: 671,
    //   original_language: "en",
    //   original_title: "Harry Potter and the Philosopher's Stone",
    //   overview:
    //     "해리 포터는 위압적인 버논 숙부와 냉담한 이모 페투니아, 욕심 많고 버릇없는 사촌 더즐리 밑에서 갖은 구박을 견디며 계단 밑 벽장에서 생활한다. 이모네 식구들 역시 해리와의 동거가 불편하기는 마찬가지. 이모 페투니아에겐 해리가 이상한 언니 부부에 관한 기억을 떠올리게 만드는 달갑지 않은 존재다. 11살 생일이 며칠 앞으로 다가왔지만 한번도 생일파티를 치르거나 제대로 된 생일선물을 받아 본 적이 없는 해리로서는 특별히 신날 것도 기대 할 것도 없다. 11살 생일을 며칠 앞둔 어느 날 해리에게 초록색 잉크로 쓰여진 한 통의 편지가 배달된다. 그 편지의 내용은 다름 아닌 해리의 11살 생일을 맞이하여 호그와트에서 보낸 입학 초대장이었다. 그리고 해리의 생일을 축하하러 온 거인 해그리드는 해리가 모르고 있었던 해리의 진정한 정체를 알려주는데...",
    //   popularity: 216.329,
    //   poster_path:
    //     "https://image.tmdb.org/t/p/w500/unEtC8uWn2lcQLnwKG9PZJX0h0c.jpg",
    //   release_date: "2001-11-16",
    //   title: "해리 포터와 마법사의 돌",
    //   video: false,
    //   vote_average: 7.9,
    //   vote_count: 22895,
    // },
    // {
    //   adult: false,
    //   backdrop_path:
    //     "https://image.tmdb.org/t/p/w500/urDWNffjwmNi5IQaezw9GwqkUXa.jpg",
    //   genre_ids: [12, 14],
    //   id: 767,
    //   original_language: "en",
    //   original_title: "Harry Potter and the Half-Blood Prince",
    //   overview:
    //     "어둠의 세력이 더욱 강력해져 머글 세계와 호그와트까지 위협해온다. 위험한 기운을 감지한 덤블도어 교수는 다가올 전투에 대비하기 위해 해리 포터와 함께 대장정의 길을 나선다. 볼드모트를 물리칠 수 있는 유일한 단서이자 그의 영혼을 나누어 놓은 7개의 호크룩스를 파괴하는 미션을 수행해야만 하는 것! 또한 덤블도어 교수는 호크룩스를 찾는 기억여행에 결정적 도움을 줄 슬러그혼 교수를 호그와트로 초청한다. 한편 학교에서는 계속된 수업과 함께 로맨스의 기운도 무르익는다. 해리는 자신도 모르게 지니에게 점점 끌리게 되고, 새로운 여자 친구가 생긴 론에게 헤르미온느는 묘한 질투심을 느끼는데...",
    //   popularity: 168.505,
    //   poster_path:
    //     "https://image.tmdb.org/t/p/w500/fHfnrfpQXt91XN4XBh9DMDFuYdq.jpg",
    //   release_date: "2009-07-07",
    //   title: "해리 포터와 혼혈 왕자",
    //   video: false,
    //   vote_average: 7.7,
    //   vote_count: 16331,
    // },
  ],
  id: "johnny94",
  password: "123456",
};

function reducer(state = initialState, action) {
  console.log("action은?", action);
  console.log(state);
  //

  if (action.type === "ADD_MOVIE") {
    for (let i = 0; i < state.myList.length; i++) {
      if (state.myList[i].id == action.payload.movieDetail.id) {
        state.myList.splice(i, 1);
      }
    }
    return {
      ...state,
      myList: [...state.myList, action.payload.movieDetail],
    };
  }
  //
  if (action.type === "REMOVE_MOVIE") {
    for (let i = 0; i < state.myList.length; i++) {
      if (state.myList[i].id == action.payload.movieDetail.id) {
        state.myList.splice(i, 1);
      }
    }
    // return {
    //   ...state,
    //   myList: [...state.myList, action.payload.movieDetail],
    // };
  }

  return { ...state };
}

export default reducer;
