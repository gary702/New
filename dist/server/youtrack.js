import fetch from 'node-fetch';
const YOUTRACK_URL = 'https://brightan.myjetbrains.com/youtrack/api';
const YOUTRACK_TOKEN = 'perm-Z2FyeQ==.NjYtNDU=.GZ35OgI6u1jQBS6dgJBSKSMASB1FkY';
export async function getYouTrackIssues() {
    const response = await fetch(`${YOUTRACK_URL}/issues?fields=id,summary,description`, {
        headers: {
            'Authorization': `Bearer ${YOUTRACK_TOKEN}`,
            'Accept': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch YouTrack issues: ${response.statusText}`);
    }
    return await response.json();
}
