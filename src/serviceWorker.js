const pushServerPublicKey = urlBase64ToUint8Array('BM0kvq9Et9gZtd3-zjV4z33dMMSSDKxbxOVE0Anyh75qBEPcu4AUtsIAafOERDSiItof3lDo-TRVFcpznxo8gd4')

const apiUrl = '/api'


function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[ i ] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function isServiceWorkerSupported () {
  return "serviceWorker" in navigator
}

function isPushNotificationSupported () {
  return "PushManager" in window;
}

async function askUserPermission () {
  return await Notification.requestPermission();
}

function registerServiceWorker () {
  if (isServiceWorkerSupported()) {
    return navigator.serviceWorker.register("/service-worker.js");
  }
}

function saveSubcriptionId (id) {
  localStorage.setItem('pushid', id)
}

function getSubscriptionId () {
  return localStorage.getItem('pushid')
}


async function createNotificationSubscription () {
  if (isServiceWorkerSupported() && isPushNotificationSupported()) {
    const serviceWorker = await navigator.serviceWorker.ready;
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey
    });
  }

}

async function saveSubscription (sub) {
  const res = await fetch(`${apiUrl}/subscription`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    body: JSON.stringify(sub),
    method: "POST",
    mode: "cors"
  })
  const data = await res.json()
  saveSubcriptionId(data.data._id)

}

async function updateSubscription (id, sub) {
  const res = await fetch(`${apiUrl}/subscription/${id}`, {
    credentials: "omit",
    headers: { "content-type": "application/json;charset=UTF-8", "sec-fetch-mode": "cors" },
    body: JSON.stringify(sub),
    method: "PATCH",
    mode: "cors"
  })
  const data = await res.json()
  saveSubcriptionId(data.data._id)
}

function getUserSubscription () {
  if (isServiceWorkerSupported() && isPushNotificationSupported()) {
    return navigator.serviceWorker.ready
      .then(function (serviceWorker) {
        return serviceWorker.pushManager.getSubscription();
      })
      .then(function (pushSubscription) {
        return pushSubscription;
      });
  }
}

export {
  isPushNotificationSupported,
  isServiceWorkerSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription,
  saveSubcriptionId,
  saveSubscription,
  getSubscriptionId,
  updateSubscription
};