const http = require('http');

async function run() {
  const res = await fetch("http://localhost:3000/api/auth/callback/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "email=admin%40example.com&password=admin&redirect=false",
    redirect: "manual"
  });
  const cookies = res.headers.get("set-cookie");
  console.log("Cookies:", cookies ? "YES" : "NO");
  
  // Extract authjs.session-token
  const match = cookies && cookies.match(/authjs\.session-token=([^;]+)/);
  if (!match) {
    console.log("No session token found");
    return;
  }
  const token = match[1];
  
  console.log("Hitting /dashboard/admin...");
  let currentUrl = "http://localhost:3000/dashboard/admin";
  for(let i=0; i<10; i++) {
    const r = await fetch(currentUrl, {
      headers: { Cookie: `authjs.session-token=${token}` },
      redirect: "manual"
    });
    console.log(`[${r.status}] ${currentUrl}`);
    if (r.status >= 300 && r.status < 400) {
      currentUrl = r.headers.get("location");
      if (!currentUrl.startsWith("http")) currentUrl = "http://localhost:3000" + currentUrl;
      console.log(" -> Redirects to", currentUrl);
    } else {
      console.log(" -> Done (No redirect)");
      break;
    }
  }
}
run();
