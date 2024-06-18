import Sidebar from "../components/Sidebar";

function About() {
    return (
        <div className="w-full overflow-hidden min-h-[90vh]">  
            <div className="flex flex-row ">
                <div className="fixed">
                    <Sidebar/>  
                </div>
                <div className="flex flex-col w-[100%]"> 
                    <div className="mx-auto"> 
                        <h1 className="my-5 text-4xl font-mono border-b-2 border-b-red-500">About</h1> 
                    </div>
                    <h1 className="indent-10 sm:indent-24 w-[90%] mx-auto text-start">โครงการนี้เป็นการผสมผสานระหว่าง Quarkus, Minio, Jasper และ React เพื่อสร้างแอปพลิเคชันที่มีความสามารถในการจัดการไฟล์และการแสดงข้อมูลอย่างมีประสิทธิภาพ โดยทำการสร้างเว็บแอปพลิเคชันที่สามารถอัปโหลดไฟล์ไปยัง Minio Object Storage และแสดงข้อมูลจาก Minio ในรูปแบบของรายงาน PDF ผ่าน Jasper Reports โดยใช้ Quarkus เป็นพื้นฐานของเซิร์ฟเวอร์และ React เป็นอินเตอร์เฟสผู้ใช้งาน
                        หากต้องการสรุปโครงการนี้เป็นแนวทางการพัฒนาซอฟต์แวร์ที่รวมเทคโนโลยีที่หลากหลายเข้าด้วยกันเพื่อสร้างแอปพลิเคชันที่สามารถจัดการข้อมูลและแสดงผลได้อย่างมีประสิทธิภาพ โดยใช้ Quarkus เป็นภาษาโปรแกรมเซิร์ฟเวอร์และส่วนต่อประสานผู้ใช้งาน มีการใช้ Minio เป็นระบบจัดเก็บข้อมูลแบบ Object Storage และ Jasper Reports เพื่อสร้างรายงาน PDF และ React เป็นไปเป็นมาส่วนที่ใช้สร้างอินเตอร์เฟสผู้ใช้งานและการแสดงผลแบบพร้อมสตรีม.</h1>
                </div>
            </div>
        </div>
    )
}
export default About;