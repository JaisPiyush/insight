export default function(context){
    let userAgent = context.req.headers["user-agent"]
    context.isMobile = /mobile/i.test(userAgent)
}