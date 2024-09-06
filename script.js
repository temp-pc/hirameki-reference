let jsonData
const baseUrl = 'https://x.com';
const allTweetsContainer = document.getElementById('all-team-info-container');
const replySVG = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>`
const repostSVG = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg>`
const likeSVG = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>`
const viewSVG = `<svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>`


const userSelect = document.querySelector('#user-select');
const selectedUsersContainer = document.querySelector('#selected-users');
let selectedUserIdList



fetch('data.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data
    const initialAccounts = jsonData.map(oneUserData => oneUserData.userId);
    selectedUserIdList = initialAccounts;
    setupUserSelector(jsonData);
    createTweetDatas(jsonData);
  })
  .catch(error => {
    console.error('Error loading data:', error);
  });

updateSelectedUsersContainer()
function updateSelectedUsersContainer() {
  // ここで中身がちゃんと表示されるか確認する
  selectedUsersContainer.innerHTML = '';

  selectedUserIdList.forEach(userId => {
    const userBadge = document.createElement('div');
    userBadge.className = 'user-badge';
    userBadge.value = userId;
    userBadge.textContent = userId; //TODO:タイトルにしたい

    // 削除ボタンを追加
    const removeButton = document.createElement('button');
    removeButton.textContent = '×';
    removeButton.className = "remove-user-badge"
    removeButton.onclick = () => {
      selectedUserIdList = selectedUserIdList.filter(id => id !== userId);
      updateSelectedUsersContainer();
      createTweetDatas()
    };

    userBadge.appendChild(removeButton);
    selectedUsersContainer.appendChild(userBadge);
  });
}


function setupUserSelector() {
  userSelect.innerHTML = ''; //初期化

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = 'Select a user';
  userSelect.appendChild(placeholderOption);

  jsonData.forEach(user => {
    const userId = user.userId
    if (!selectedUserIdList.includes(userId)) {
      const option = document.createElement('option');
      option.value = userId;
      option.textContent = `『${user.title}』${user.year}年${user.teamType}チーム【${user.grades}】`;
      userSelect.appendChild(option);
    }
  });

  // ドロップダウンで選択したユーザーをリストに追加
  userSelect.addEventListener('change', event => {
    console.log("user selected");
    const userId = event.target.value;
    if (userId && !selectedUserIdList.includes(userId)) {
      selectedUserIdList.push(userId);
      updateSelectedUsersContainer(); // 選択中のユーザーリストを更新
      createTweetDatas();
    }

    userSelect.selectedIndex = 0;
  });
}


document.getElementById('toggle-filters').addEventListener('click', function () {
  console.log("filter clicked")
  const filtersContainer = document.getElementById('filters-container');
  if (filtersContainer.style.display === 'none' || filtersContainer.style.display === '') {
    filtersContainer.style.display = 'block'; // フィルターを表示
  } else {
    filtersContainer.style.display = 'none'; // フィルターを非表示
  }
});

const flatpickrConfig = {
  locale: "ja",
  dateFormat: "m/d", // 「月-日」のみを使用
  altFormat: "m月d日", // 表示形式
  onChange: createTweetDatas,
};

// Flatpickrのインスタンスを作成
const startDatePicker = flatpickr("#startDate", flatpickrConfig);
const endDatePicker = flatpickr("#endDate", flatpickrConfig);
document.getElementById('clearStartDate').addEventListener('click', function () {
  startDatePicker.clear();
  createTweetDatas()
});
document.getElementById('clearEndDate').addEventListener('click', function () {
  endDatePicker.clear();
  createTweetDatas()
});

function createTweetDatas() {
  allTweetsContainer.innerHTML = '';
  const userFilteredData = jsonData.filter(user => selectedUserIdList.includes(user.userId));
  userFilteredData.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // yearが異なる場合は降順に並べる
    }
    const teamOrder = { A: 1, B: 2, C: 3 };  // teamTypeをA→B→Cの順でソート
    return teamOrder[a.teamType] - teamOrder[b.teamType];
  });
  userFilteredData.forEach(oneUserData => {

    // ユーザーのカラムを作成
    const userRow = document.createElement('div');
    userRow.className = 'user-row';
    userRow.id = oneUserData.userId;

    // カラムのタイトル（ユーザー名）を表示
    const teamInfoContainer = document.createElement('div');
    teamInfoContainer.className = 'team-info';

    const userTitle = document.createElement('h4');
    userTitle.innerHTML = `『${oneUserData.title}』<br>${oneUserData.year}年${oneUserData.teamType}チーム<br>【${oneUserData.grades}】`;
    userTitle.className = "user-title"
    teamInfoContainer.appendChild(userTitle);

    const catchPhrase = document.createElement('div');
    catchPhrase.className = 'catch-phrase';
    catchPhrase.innerText = `${oneUserData.catchphrase}`;
    teamInfoContainer.appendChild(catchPhrase);

    const coverImage = document.createElement('img');
    coverImage.className = 'cover-image';
    coverImage.src = oneUserData.coverURL;
    teamInfoContainer.appendChild(coverImage);

    const overview = document.createElement('div');
    overview.className = 'overview';
    overview.innerHTML = `概要<br>${oneUserData.overview}`;
    teamInfoContainer.appendChild(overview);

    const tableOfContents = document.createElement('div');
    tableOfContents.className = 'table-of-contents';
    tableOfContents.innerHTML = `目次<br>${oneUserData.tableOfContents}`;
    teamInfoContainer.appendChild(tableOfContents);


    userRow.appendChild(teamInfoContainer);

    const showTweetsButton = document.createElement('button');
    showTweetsButton.textContent = 'ツイート表示';
    showTweetsButton.className = 'show-tweets-button';

    const tweetsContainer = document.createElement('div');
    tweetsContainer.className = 'tweets-container';
    tweetsContainer.style.display = 'none'; // デフォルトで非表示

    showTweetsButton.addEventListener('click', () => {
      if (tweetsContainer.style.display === 'none') {
        tweetsContainer.style.display = 'block';
        showTweetsButton.textContent = 'ツイート非表示'; // ボタンのテキストを変更
      } else {
        tweetsContainer.style.display = 'none';
        showTweetsButton.textContent = 'ツイート表示';
      }
    });
    userRow.appendChild(showTweetsButton);

    //日付でフィルター
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value;

    // 年月日が範囲内にあるか確認する関数
    function isDateInRange(tweetDate, startFullDate, endFullDate) {
      if (startFullDate && endFullDate) {
        return tweetDate >= startFullDate && tweetDate <= endFullDate;
      } else if (startFullDate) {
        return tweetDate >= startFullDate;
      } else if (endFullDate) {
        return tweetDate <= endFullDate;
      }
      return true; // フィルタ条件がない場合、すべてを含む
    }

    // フィルタリングの適用部分
    let tweetsData;
    if (startDate || endDate) {
      const tweetYear = oneUserData.year; // ツイートの西暦
      const startFullDate = startDate ? `${tweetYear}-${startDate}` : null; // "2023-03/15"
      const endFullDate = endDate ? `${tweetYear}-${endDate}` : null; // "2023-06/20"

      tweetsData = oneUserData.tweets.filter(tweet => {
        const tweetDate = tweet.tweetDateTime.split(' ')[0]; // ツイートの完全な日付 (例: "2023-03-16")
        return isDateInRange(tweetDate, startFullDate, endFullDate);
      });
    } else {
      tweetsData = oneUserData.tweets;
    }


    // // 月日が範囲内にあるか確認する関数
    // function isDateInRange(tweetMonthDay, startMonthDay, endMonthDay) {
    //   if (startMonthDay && endMonthDay) {
    //     return tweetMonthDay >= startMonthDay && tweetMonthDay <= endMonthDay;
    //   } else if (startMonthDay) {
    //     return tweetMonthDay >= startMonthDay;
    //   } else if (endMonthDay) {
    //     return tweetMonthDay <= endMonthDay;
    //   }
    //   return true; // フィルタ条件がない場合、すべてを含む
    // }

    // let tweetsData
    // if (startDate || endDate) {
    //   tweetsData = oneUserData.tweets.filter(tweet => {
    //     const tweetDate = tweet.tweetDateTime.split(' ')[0].slice(5) // "MM/DD" を抽出
    //     // `startDate` と `endDate` でフィルタリング
    //     return isDateInRange(tweetDate, startDate, endDate);
    //   });
    // } else {
    //   tweetsData = oneUserData.tweets;
    // }

    tweetsData.forEach(tweet => {
      const tweetElement = document.createElement('div');
      tweetElement.className = 'tweet-container';

      // ツイートのヘッダー部分
      const tweetHeader = document.createElement('div');
      tweetHeader.className = 'tweet-header';
      tweetHeader.innerHTML = `
    <div class="repost-info"></div>
    <div class="icon-and-timestamp">
      <img src="${tweet.iconImageURL}" alt="User Icon" class="icon">
      <div class="twitter-user-info">${oneUserData.userName}@${oneUserData.userId}</div>
      <div>${tweet.tweetDateTime}</div>
    </div>
  `;
      tweetElement.appendChild(tweetHeader);

      // ツイートの内容部分
      const tweetContent = document.createElement('div');
      tweetContent.className = 'tweet-content';
      tweetContent.textContent = tweet.tweetContent;
      tweetElement.appendChild(tweetContent);

      // 画像がある場合
      if (tweet.attachedImageURLs && tweet.attachedImageURLs.length > 0) {
        const attachedImages = document.createElement('div');
        attachedImages.className = 'attached-images';
        tweet.attachedImageURLs.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.className = 'tweet-image';
          attachedImages.appendChild(img);
        });
        tweetElement.appendChild(attachedImages);
      }

      // ツイートのフッター部分
      const tweetFooter = document.createElement('div');
      tweetFooter.className = 'tweet-footer';
      tweetFooter.innerHTML = `
      <span>${replySVG} ${tweet.replyCount}</span>
      <span>${repostSVG} ${tweet.repostCount}</span>
      <span>${likeSVG} ${tweet.likeCount}</span>
      <span>${viewSVG} ${tweet.viewCount}</span>
  `;
      tweetElement.appendChild(tweetFooter);

      // Twitterのページを表示するリンク
      const tweetSourceLink = document.createElement('div');
      tweetSourceLink.className = 'tweet-source-link';
      tweetSourceLink.innerHTML = `<a href="${baseUrl}${tweet.url}" target="_blank">Open in X</a>`
      tweetElement.appendChild(tweetSourceLink);

      if (tweet.repostFlag) {
        const repostInfo = tweetElement.querySelector('.repost-info')
        repostInfo.innerHTML = `${repostSVG} ${oneUserData.userId} reposted`;
      }

      // ツイート要素をコンテナに追加
      tweetsContainer.appendChild(tweetElement);
    });

    userRow.appendChild(tweetsContainer);
    allTweetsContainer.appendChild(userRow);
  })

}

function customSort(a, b) {
  if (a.year !== b.year) {
    return b.year - a.year; // yearが異なる場合は降順に並べる
  }

  const teamOrder = { A: 1, B: 2, C: 3 };
  return teamOrder[a.teamType] - teamOrder[b.teamType];
}