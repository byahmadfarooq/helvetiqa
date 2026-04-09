function requireGithubEnv() {
  const token = process.env.GITHUB_PAT;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!token || !owner || !repo) {
    throw new Error("Missing GitHub env vars.");
  }
  return { token, owner, repo };
}

function githubHeaders() {
  const { token } = requireGithubEnv();
  return {
    authorization: `Bearer ${token}`,
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
  };
}

export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  const { owner, repo } = requireGithubEnv();
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "GET",
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GitHub getFile failed: ${res.status}`);
  }

  const json = (await res.json()) as { content: string; sha: string };
  return { content: json.content, sha: json.sha };
}

export async function createFile(path: string, content: string, message: string) {
  const { owner, repo } = requireGithubEnv();
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...githubHeaders(), "content-type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub createFile failed: ${res.status}`);
  }
  return res.json();
}

export async function updateFile(path: string, content: string, sha: string, message: string) {
  const { owner, repo } = requireGithubEnv();
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: { ...githubHeaders(), "content-type": "application/json" },
    body: JSON.stringify({
      message,
      sha,
      content: Buffer.from(content, "utf8").toString("base64"),
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub updateFile failed: ${res.status}`);
  }
  return res.json();
}

export async function deleteFile(path: string, sha: string, message: string) {
  const { owner, repo } = requireGithubEnv();
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "DELETE",
    headers: { ...githubHeaders(), "content-type": "application/json" },
    body: JSON.stringify({ message, sha }),
  });

  if (!res.ok) {
    throw new Error(`GitHub deleteFile failed: ${res.status}`);
  }
  return res.json();
}

