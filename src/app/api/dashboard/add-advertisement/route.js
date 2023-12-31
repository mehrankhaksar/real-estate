import Advertisement from "@/models/Advertisement";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(req);
  if (!session)
    return NextResponse.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );

  try {
    await connectDB();

    const {
      title,
      province,
      city,
      address,
      phoneNumber,
      price,
      realEstate,
      description,
      category,
      amenities,
      rules,
      constructionDate,
    } = await req.json();

    const user = await User.findOne({ email: session.user.email });
    if (!user)
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 }
      );

    const newAmenities = amenities.filter((item) => item !== "");
    const newRule = rules.filter((item) => item !== "");

    const newAdvertisement = await Advertisement.create({
      title,
      province,
      city,
      address,
      phoneNumber,
      price,
      realEstate,
      description,
      category,
      amenities: newAmenities,
      rules: newRule,
      constructionDate,
      userId: new Types.ObjectId(user._id),
    });
    console.log(newAdvertisement);
    return NextResponse.json(
      { message: "آگهی با موفقیت ثبت شد." },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "خطایی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
