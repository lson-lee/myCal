let eventGuid = 0

export const getEventObj = (obj: any) => {
    return {
        id: getEventId(),
        title: obj.title,
        start: obj.start,
        end: obj.end,
        allDay: obj.allDay,
        image: obj.image || 'https://learn.microsoft.com/zh-cn/powershell/media/index/avatar_128.svg'
    }
}

export const getEventId = () => {
  return String(eventGuid++)
}
