import { useEffect, useState } from "react";

const DetailHumanProcess = ({ humanProcess, onClose, onShow, electricProcess, woodProcess }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log(electricProcess)
        setIsModalOpen(onShow);
    }, [onShow]);

        return (
            <div>
            {onShow && <div className="fixed z-40 h-screen w-full bg-gray-900 top-0 left-0 opacity-10" onClick={onClose}></div>}
            {onShow && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 z-50 bg-white p-8 border rounded shadow w-8/12">
                
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
            <tr>
                <th className="font-medium text-sm py-2 px-4 border-b">Nama</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Tenaga L</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Tenaga P</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Waktu Kerja</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Energi</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Energi/Produksi</th>


            </tr>
            </thead>
            <tbody>
            {humanProcess.map((item) => (
                <tr key={item.id}>
                <td className="text-sm py-2 px-4 border-b">{item.process_name}</td>
                <td className="text-sm py-2 px-4 border-b">{item.male_resource}</td>
                <td className="text-sm py-2 px-4 border-b">{item.female_resource}</td>
                <td className="text-sm py-2 px-4 border-b">{item.working_time}</td>
                <td className="text-sm py-2 px-4 border-b">{item.result.human_energy?.toFixed(4)}</td>
                <td className="text-sm py-2 px-4 border-b">{item.result.human_energy_each_production?.toFixed(4)}</td>
                
                </tr>
            ))}
            </tbody>
            </table>
                
            
            <br />
            <br />
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
            <tr>
                <th className="font-medium text-sm py-2 px-4 border-b">Kegiatan</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Konsumsi Energi(Kwh) </th>
                <th className="font-medium text-sm py-2 px-4 border-b">Konsumsi Energi(mj)</th>
                <th className="font-medium text-sm py-2 px-4 border-b">mj/kg</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Kwh/kg</th>


            </tr>
            </thead>
            <tbody>
                
                
                <tr>
                <td className="text-sm py-2 px-4 border-b">Pencucian dan Perebusan</td>
                <td className="text-sm py-2 px-4 border-b">{electricProcess?.result?.kwh}</td>
                <td className="text-sm py-2 px-4 border-b">{electricProcess?.result?.mj}</td>
                <td className="text-sm py-2 px-4 border-b">{electricProcess?.result?.mjPerProd}</td>
                <td className="text-sm py-2 px-4 border-b">{electricProcess?.result?.kwhPerProd}</td>
                
                </tr>
                
            </tbody>
            </table>
            <br />
            <br />
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
            <tr>
                <th className="font-medium text-sm py-2 px-4 border-b">Kegiatan</th>
                <th className="font-medium text-sm py-2 px-4 border-b">Konsumsi Energi(mj)</th>
                <th className="font-medium text-sm py-2 px-4 border-b">mj/kg</th>


            </tr>
            </thead>
            <tbody>
                
                
                <tr>
                <td className="text-sm py-2 px-4 border-b">Pencucian dan Perebusan</td>
                <td className="text-sm py-2 px-4 border-b">{woodProcess?.result?.mj}</td>
                <td className="text-sm py-2 px-4 border-b">{woodProcess?.result?.mjPerProd}</td>
                
                </tr>
                
            </tbody>
            </table>
            </div>}
            </div>
        )
}

export default DetailHumanProcess