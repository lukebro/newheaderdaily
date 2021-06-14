const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json'
};

export async function requestUpdateSchedule(active) {
    let response = await fetch('/api/schedule', {
        headers: headers,
        method: 'PATCH',
        body: JSON.stringify({ active: !!active })
    });

    return await response.json();
}
